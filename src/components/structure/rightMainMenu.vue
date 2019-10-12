<template >
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-2"
      >
      <q-list>
        <q-item-label header>{{$t('EssentialLinks')}}</q-item-label>
        <div class="mainMenuWrapper">
          <ul>
            <li class="mainMenuLi">
              <!-- home route -->
              <router-link :to="'/' +locale">
                <q-icon name="home" />
                {{$t('dashboard')}}
              </router-link>
            </li>
            <li class="mainMenuLi">
              <!-- profile route -->
              <router-link :to="'/' +locale + '/' + 'profile'">
                <q-icon name="face" />
                {{$t('profile')}}
              </router-link>
            </li>
            <li class="mainMenuLi">
              <!-- tickets -->
              <router-link :to="'/' +locale + '/' + 'tickets'">
                <q-icon name="system_update_alt" />
                {{$t('tickets')}}
              </router-link>
            </li>
            <li class="mainMenuLi">
              <!-- my tasks route -->
              <router-link :to="'/' +locale + '/' + 'tasks'">
                <q-icon name="play_for_work" />
                {{$t('mytasks')}}
              </router-link>
            </li>
            <li class="mainMenuLi">
              <!-- services route -->
              <router-link :to="'/' +locale + '/' + 'services'">
                <q-icon name="perm_data_setting" />
                {{$t('services')}}
              </router-link>
            </li>
            <li class="mainMenuLi">
              <!-- userManagement route -->
              <router-link :to="'/' +locale + '/' + 'userManagement'">
                <q-icon name="supervisor_account" />
                {{$t('userManagement')}}
              </router-link>
            </li>
            <li class="mainMenuLi">
              <!-- billing route -->
              <router-link :to="'/' +locale + '/' + 'billing'">
                <q-icon name="attach_money" />
                {{$t('Billing')}}
              </router-link>
            </li>
          </ul>
        </div>
      </q-list>
    </q-drawer>
</template>
<script>
export default {
  name: 'rightMainMenu',
  props: ['locale', 'leftDrawerOpen'],
  data() {
    return {

    };
  },
};
</script>
