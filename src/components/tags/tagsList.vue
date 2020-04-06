<template>
  <div class="tagsListWrapp">
    <ul>
      <li v-for="tag in activetags" :key="tag.id">
        <q-card class="card mb12 tagList">
          <!-- action -->
          <q-card-actions class="bg-white tagAction">
            <span>{{ tag.title }}</span>
          </q-card-actions>
          <!-- main content -->
          <div class="tagListButtsWrapper">
            <q-card-section class="tagTxt brright">
              <q-icon name="edit" class="editTag">
                <q-tooltip transition-show="scale" transition-hide="scale">
                  {{
                  $t('editTag')
                  }}
                </q-tooltip>
              </q-icon>
              <q-popup-edit
                v-model.trim="tag.title"
                buttons
                anchor="top left"
                :validate="checkForReapetedTags"
              >
                <q-input
                  v-model.trim="tag.title"
                  dense
                  autofocus
                  counter
                  debounce="1000"
                  :error="errorValidation"
                  @change="setEditTag(tag)"
                />
              </q-popup-edit>
            </q-card-section>
            <q-card-section
              v-if="$store.state.module1.userData.role === 'MANAGER'"
              class="tagTxt p16 brleft"
              @click="deactiveTag(tag)"
            >
              <q-icon name="fa fa-trash" class="editTag">
                <q-tooltip transition-show="scale" transition-hide="scale">
                  {{
                  $t('deactiveTag')
                  }}
                </q-tooltip>
              </q-icon>
            </q-card-section>
          </div>
        </q-card>
      </li>
    </ul>
    <div v-if="deactivetags.length">
      <h4 class="headerTitleInPage">
        <span>{{ $t('deletedTags') }}</span>
      </h4>
      <ul class="deactiveList">
        <li v-for="tag in deactivetags" :key="tag.id">
          <q-card class="card mb12 tagList">
            <!-- action -->
            <q-card-actions class="tagAction">
              <span class="clw">{{ tag.title }}</span>
            </q-card-actions>
            <!-- main content -->
            <q-card-section class="tagTxt p16 brleft" @click="activeTag(tag)">
              <q-icon name="restore" class="editTag positive clb">
                <q-tooltip transition-show="scale" transition-hide="scale">
                  {{
                  $t('restoreTag')
                  }}
                </q-tooltip>
              </q-icon>
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
      tags: [],
      showing: false,
      showing1: false,
      errorValidation: false,
      validTag: false,
    };
  },

  computed: {
    activetags() {
      return this.tags.filter(item => item.deleted === false);
    },
    deactivetags() {
      return this.tags.filter(item => item.deleted === true);
    },
  },

  methods: {
    checkForReapetedTags() {
      console.log(this.validTag);

      if (this.validTag) {
        this.errorValidation = false;
        return true;
      }
      this.errorValidation = true;
      return false;
    },
    setEditTag(tag) {
      this.$axios
        .put(`/v1/api/vkann/tags/${tag.id}`, {
          id: tag.id,
          title: tag.title,
          status: tag.status,
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$emit('addToTags', this.tags);
            this.validTag = true;
            console.log(`success${this.validTag}`);
            this.$q.notify({
              message: this.$t('successfullTagEdit'),
              color: 'positive',
              icon: 'warning',
              position: 'top',
            });
          }
        })
        .catch(e => {
          console.log(e.response.status);
          this.validTag = false;
          console.log(`error${this.validTag}`);
          this.$q.notify({
            message: this.$t('reapetedtag'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        });
    },
    deactiveTag(tag) {
      this.$q
        .dialog({
          title: this.$t('deleteTag'),
          message: this.$t('areyousureyouwanttodeletethisTag'),
          cancel: true,
        })
        .onOk(() => {
          console.log('OK');
          this.$axios.delete(`/v1/api/vkann/tags/${tag.id}`).then(res => {
            console.log(res);
          });
          this.$q.notify({
            message: this.$t('tagDeleted'),
            color: 'positive',
            icon: 'check',
            position: 'top',
          });

          this.$emit('deleteTag', this.tags);
        })
        .onCancel(() => {
          console.log('Cancel');
        });
    },
    activeTag(tag) {
      this.$q
        .dialog({
          title: this.$t('restoreTag'),
          message: this.$t('areyousureyouwanttorestoretag'),
          cancel: true,
        })
        .onOk(() => {
          this.$axios.patch(`/v1/api/vkann/tags/${tag.id}`).then(res => {
            console.log(res);
          });
          this.$emit('activeAgain', this.tag);
          this.$q.notify({
            message: this.$t('tagrestored'),
            color: 'positive',
            icon: 'check',
            position: 'top',
          });
        })
        .onCancel(() => {
          console.log('Cancel');
        });
    },
  },
  mounted() {
    this.$axios.get('/v1/api/vkann/tags/list').then(res => {
      console.log(res);
      this.tags = res.data.tags;
    });
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
      width: calc(100% / 3 - 18px);
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
      width: calc(100% / 3 - 18px);
      @media screen and (max-width: 800px) {
        width: calc(100% / 2 - 18px);
      }
      @media screen and (max-width: 480px) {
        width: calc(100% - 18px);
      }
      > div {
        background-color: #d71227;
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
