<template>
    <div class="tagsListWrapp">
        <ul>
            <li v-for="tag in tags" :key="tag.id">
                <q-card class="card mb12" >
                    <!-- action -->
                    <q-card-actions class="bg-white tagAction">
                         
                            <span >{{tag.name}}</span>
                    </q-card-actions>
                    <!-- main content -->
                    <q-card-section class="tagTxt">
                        <q-icon name="edit" class="editTag"/>
                        <q-popup-edit v-model="tag.name" buttons anchor="top left">
                            <q-input v-model="tag.name" dense autofocus counter />
                        </q-popup-edit>
                    </q-card-section>
                </q-card>
            </li>
        </ul>
        
    </div>
</template>

<script>
export default {
  name: 'tagList',
  data() {
    return {
      edittag: '',
      tags: this.data,
    };
  },
  props: ['data'],
  methods: {
    setEditTag(value, initialValue) {
      console.log(value);
      this.tags.forEach(tag => {
        if (tag.name === initialValue) {
          tag.name = value;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.card {
  display: flex;
  justify-content: space-between;
  .tagTxt {
    float: right;
    background-color: #d2d2d2;
    cursor: pointer;
    i {
      font-size: 21px;
    }
  }
  .tagAction {
    align-items: center;
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
      margin-right: 18px;
    }
  }
}
</style>
