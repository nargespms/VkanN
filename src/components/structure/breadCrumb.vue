<template >
  <div class="breadCrumbWrapp">
    <q-breadcrumbs class="text-brown con12">
      <template v-slot:separator>
        <q-icon size="1.2em" name="chevron_right" color="primary" />
      </template>
      <q-breadcrumbs-el
        v-for="route in newroute"
        :key="route.index"
        :label="$t(`${route}`)"
        :to="'/' + $route.params.locale + '/' "
      />
    </q-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'breadCrumb',
  watch: {
    arraySize() {
      if (this.newroute.length === 2) {
        console.log('2tayie');
      } else if (this.newroute.length === 3) {
        console.log('3tayie');
      }
    },
  },
  computed: {
    newroute() {
      return this.$route.path.split('/').slice(2);
    },
  },
};
</script>

<style lang="scss">
.breadCrumbWrapp {
  padding: 8px;
  border: 1px solid #dbdbdb;
  background-color: #d5d5d5;
  border-bottom: 5px solid #2f718f;
}
</style>
