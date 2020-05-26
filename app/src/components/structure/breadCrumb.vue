<template >
  <div class="breadCrumbWrapp">
    <div class="con16 flexbet">
      <q-breadcrumbs class="text-brown pl100" v-if="currentRoute !== 'signIn'">
        <template v-slot:separator>
          <q-icon size="1.2em" name="chevron_right" color="primary" />
        </template>

        <q-breadcrumbs-el v-for="route in newroute" :key="route.index">
          <router-link class="breadCrumbItem" :to="{name:route}">{{$t(`${route}`)}}</router-link>
        </q-breadcrumbs-el>
      </q-breadcrumbs>
      <div class="flex">
        <taskModal
          v-if="$store.state.module1.logedIn && $store.state.module1.userData.user.role !== 'CLIENT'"
        />
        <ticketModal class="pl12" v-if="$store.state.module1.logedIn" />
      </div>
    </div>
  </div>
</template>

<script>
import taskModal from './taskModal.vue';
import ticketModal from './ticketModal.vue';

export default {
  name: 'breadCrumb',
  components: {
    taskModal,
    ticketModal,
  },
  computed: {
    currentRoute() {
      return this.$route.path
        .split('/')
        .slice(2)
        .join('/')
        .toString();
    },
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
  @media screen and (max-width: 640px) {
    padding: 8px 24px;
  }
}
.breadCrumbItem {
  color: #373737;
}
.pl100 {
  padding-left: 100px;
}
</style>
