<template>
  <div class="tagsListWrapp">
    <ul>
      <li v-for="tag in activetags" :key="tag.id">
        <q-card class="card mb12 tagList">
          <!-- action -->
          <q-card-actions class="bg-white tagAction">
            <span>{{tag.name}}</span>
          </q-card-actions>
          <!-- main content -->
          <div class="tagListButtsWrapper">
            <q-card-section class="tagTxt brright">
              <q-icon name="edit" class="editTag">
                <q-tooltip transition-show="scale" transition-hide="scale">{{$t('editTag')}}</q-tooltip>
              </q-icon>
              <q-popup-edit v-model.trim="tag.name" buttons anchor="top left">
                <q-input v-model.trim="tag.name" dense autofocus counter @change="setEditTag(tag)" />
              </q-popup-edit>
            </q-card-section>
            <q-card-section class="tagTxt p16 brleft" @click="deactiveTag(tag)">
              <q-icon name="fa fa-trash" class="editTag">
                <q-tooltip transition-show="scale" transition-hide="scale">{{$t('deactiveTag')}}</q-tooltip>
              </q-icon>
            </q-card-section>
          </div>
        </q-card>
      </li>
    </ul>
    <div v-if="deactivetags.length">
      <h4 class="headerTitleInPage">
        <span>{{$t('deletedTags')}}</span>
      </h4>
      <ul class="deactiveList">
        <li v-for="tag in deactivetags" :key="tag.id">
          <q-card class="card mb12 tagList">
            <!-- action -->
            <q-card-actions class="tagAction">
              <span class="clw">{{tag.name}}</span>
            </q-card-actions>
            <!-- main content -->
            <q-card-section class="tagTxt p16 brleft" @click="activeTag(tag)">
              <q-icon name="restore" class="editTag positive clb" />
            </q-card-section>
          </q-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tagList',
  data() {
    return {
      edittag: '',
      tags: this.data,
      showing: false,
      showing1: false,
    };
  },
  props: ['data'],
  computed: {
    activetags() {
      return this.data.filter(item => item.status !== 'deactive');
    },
    deactivetags() {
      return this.data.filter(item => item.status === 'deactive');
    },
  },
  methods: {
    setEditTag(value, initialValue) {
      this.tags.forEach(tag => {
        if (tag.name === initialValue) {
          tag.name = value;
        }
      });
      this.$emit('addToTags', this.tags);
    },
    deactiveTag(tag) {
      tag.status = 'deactive';
      this.$emit('deleteTag', this.tags);
    },
    activeTag(tag) {
      tag.status = 'active';
      this.$emit('activeAgain', this.tag);
    },
  },
};
</script>

<style lang="scss">
.card {
  // display: flex;
  // justify-content: space-between;
  overflow: auto;
  .tagTxt {
    float: right;
    background-color: #d2d2d2;
    padding: 16px;
    cursor: pointer;
    i {
      font-size: 21px;
    }
  }
  .tagAction {
    align-items: center;
    float: left;
  }
}
.mb8 {
  margin-bottom: 8px;
}
.editTag {
  cursor: pointer;
}
.tagsListWrapp {
  ul {
    flex-wrap: wrap;
    display: flex;
    margin-right: -18px;
    li {
      width: calc(100% / 4 - 18px);
      @media screen and (max-width: 800px) {
        width: calc(100% / 2 - 18px);
      }
      @media screen and (max-width: 480px) {
        width: calc(100% - 18px);
      }
      margin-right: 18px;
    }
  }
  .deactiveList {
    li {
      width: calc(100% / 4 - 18px);
      @media screen and (max-width: 800px) {
        width: calc(100% / 2 - 18px);
      }
      @media screen and (max-width: 480px) {
        width: calc(100% - 18px);
      }
      > div {
        background-color: #c10015;
        color: #000;
      }
    }
  }
}
.p16 {
  padding: 16px;
}
.q-card > div:last-child,
.q-card > img:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.brright {
  border-left: 1px solid #efefef !important;
}
.brleft {
  border-right: 1px solid #b7b7b7 !important;
}
.headerTitleInPage {
  font-size: 22px;
  margin: 12px;
}
.tagList {
  display: flex;
  justify-content: space-between;
}
</style>
