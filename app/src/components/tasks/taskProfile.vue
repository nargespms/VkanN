<template>
  <div class="taskProfileWrap">
    <q-card>
      <div>
        <q-tabs v-model="tab" class="block640">
          <q-tab class="tabSelect" label name="taskProfile">
            {{
            $t('taskInformation')
            }}
          </q-tab>
          <q-tab class="tabSelect" label name="taskEdit">
            {{
            $t('edit')
            }}
          </q-tab>
        </q-tabs>

        <q-tab-panels v-if="!isLoading" v-model="tab" animated>
          <q-tab-panel name="taskProfile" class="taskProfile">
            <taskProfileCmp :data="taskData" />
          </q-tab-panel>

          <q-tab-panel name="taskEdit">
            <taskEditCmp @tabChanged="tabChanged" :data="taskData" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card>
  </div>
</template>

<script>
import taskProfileCmp from './taskProfileCmp.vue';
import taskEditCmp from './taskEditCmp.vue';

export default {
  name: 'taskProfile',
  components: {
    taskProfileCmp,
    taskEditCmp,
  },
  data() {
    return {
      tab: 'taskProfile',
      taskData: {},
      isLoading: true,
    };
  },
  methods: {
    tabChanged(value) {
      this.tab = value;
      console.log(value);
      this.$emit('reRender', true);
    },
  },
  mounted() {
    this.$axios
      .get(`/v1/api/vkann/tasks/${this.$route.params.taskId}`)
      .then(res => {
        console.log(res);
        this.taskData = res.data.task;
        this.isLoading = false;
      })
      .catch(e => {
        if (e.response.status === 422) {
          this.$q.notify({
            message: this.$t('tasksUnvalid'),
            color: 'negative',
            icon: 'warning',
            position: 'top',
          });
        }
      });
  },
};
</script>

<style lang="scss">
.taskImg {
  @media screen and (max-width: 800px) {
    display: none;
  }
  @media screen and (min-width: 800px) {
    display: block;
    width: 15%;
    display: flex;
    align-self: center;
  }
}
.taskProfileWrap {
  .q-tab {
    @media screen and (max-width: 639px) {
      width: calc(100%);
    }
    @media screen and (min-width: 640px) {
      width: calc(100% / 2);
    }
  }
  .q-tab__indicator {
    background: #027be3;
  }
  .q-tab--active {
    border-bottom: none !important;
    background-color: #d5d5d5;
  }
}
.taskProfile {
  display: flex;
  justify-content: space-evenly;
}
.taskProfileWrap {
  .q-tabs {
    border-bottom: 3px solid gray;
  }
}
</style>
