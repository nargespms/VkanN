<template >
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-white">
    <q-list>
      <q-item-label header>{{$t('EssentialLinks')}}</q-item-label>
      <div class="mainMenuWrapper">
        <ul>
          <li class="mainMenuLi">
            <!-- <q-expansion-item icon="home" :label="$t('dashboard')"> -->
            <!-- home route -->
            <router-link class="noneExpandableMenu" :to="'/' +locale + '/' + 'dashboard'">
              <q-icon name="home" />
              {{$t('dashboard')}}
            </router-link>
            <!-- </q-expansion-item> -->
          </li>
          <li class="mainMenuLi">
            <!-- <q-expansion-item
              class="expandableMenu"
              icon="fas fa-address-card"
              :label="$t('profile')"
            >-->
            <!-- profile route -->
            <router-link class="noneExpandableMenu" :to="'/' +locale + '/' + 'profile'">
              <q-icon name="fas fa-address-card" />
              {{$t('profile')}}
            </router-link>
            <!-- </q-expansion-item> -->
          </li>
          <li class="mainMenuLi">
            <q-expansion-item
              expand-icon-toggle
              class="expandableMenu"
              icon="system_update_alt"
              :label="$t('tickets')"
              :to="'/' +locale + '/' + 'tickets'"
            >
              <!-- tickets list-->
              <router-link class="block" :to="'/' +locale + '/' + 'tickets' + '/' +'ticketsList'">
                <q-icon name="system_update_alt" />
                {{$t('ticketsList')}}
              </router-link>
              <!-- add new tickets -->
              <router-link class="block" :to="'/' +locale + '/' + 'tickets' + '/' + 'addTicket'">
                <q-icon name="system_update_alt" />
                {{$t('addTicket')}}
              </router-link>
            </q-expansion-item>
          </li>
          <!-- my tasks route -->
          <li class="mainMenuLi">
            <q-expansion-item
              expand-icon-toggle
              class="expandableMenu"
              icon="play_for_work"
              :label="$t('tasks')"
              :to="'/' +locale + '/' + 'tasks'"
            >
              <router-link class="block" :to="'/' +locale + '/' + 'tasks' + '/' + 'myTasksList'">
                <q-icon name="play_for_work" />
                {{$t('mytasks')}}
              </router-link>
              <router-link class="block" :to="'/' +locale + '/' + 'tasks' + '/' + 'tasksList'">
                <q-icon name="play_for_work" />
                {{$t('tasksList')}}
              </router-link>
              <router-link class="block" :to="'/' +locale + '/' + 'tasks' + '/' + 'addTask'">
                <q-icon name="play_for_work" />
                {{$t('addTask')}}
              </router-link>
            </q-expansion-item>
          </li>
          <!-- services route -->
          <li class="mainMenuLi">
            <q-expansion-item
              icon="perm_data_setting"
              :label="$t('services')"
              expand-icon-toggle
              class="expandableMenu"
              :to="'/' +locale + '/' + 'services'"
            >
              <router-link class="block" :to="'/' +locale + '/' + 'services' + '/' +'servicesList'">
                <q-icon name="perm_data_setting" />
                {{$t('servicesList')}}
              </router-link>
              <router-link class="block" :to="'/' +locale + '/' + 'services' + '/' +'addService'">
                <q-icon name="perm_data_setting" />
                {{$t('addService')}}
              </router-link>
            </q-expansion-item>
          </li>
          <!-- userManagement route -->
          <li class="mainMenuLi">
            <q-expansion-item
              icon="supervisor_account"
              :label="$t('userManagement')"
              expand-icon-toggle
              class="expandableMenu"
              :to="'/' +locale + '/' + 'userManagement'"
            >
              <router-link
                class="block"
                :to="'/' +locale + '/' + 'userManagement' + '/' + 'staffs'"
              >
                <q-icon name="supervisor_account" />
                {{$t('staffs')}}
              </router-link>
              <router-link
                class="block"
                :to="'/' +locale + '/' + 'userManagement' + '/' + 'clients'"
              >
                <q-icon name="supervisor_account" />
                {{$t('clients')}}
              </router-link>
              <router-link
                class="block"
                :to="'/' +locale + '/' + 'userManagement' + '/' + 'addMember'"
              >
                <q-icon name="supervisor_account" />
                {{$t('addMember')}}
              </router-link>
            </q-expansion-item>
          </li>

          <!-- billing route -->
          <li class="mainMenuLi">
            <q-expansion-item
              icon="attach_money"
              :label="$t('Billing')"
              caption
              expand-icon-toggle
              class="expandableMenu"
              :to="'/' +locale + '/' + 'billing'"
            >
              <!-- contract route -->
              <router-link class="block" :to="'/' +locale + '/' +'billing'+ '/' +'contracts'">
                <q-icon name="fas fa-handshake" />
                {{$t('contracts')}}
              </router-link>
            </q-expansion-item>
          </li>
          <!-- tags management -->
          <li class="mainMenuLi">
            <!-- tags -->
            <router-link class="noneExpandableMenu" :to="'/' +locale + '/' + 'tags'">
              <q-icon name="label_important" />
              {{$t('tagsManagement')}}
            </router-link>
          </li>
          <!-- file management -->
          <li class="mainMenuLi">
            <q-expansion-item
              icon="fa fa-file"
              :label="$t('fileManagements')"
              caption
              expand-icon-toggle
              class="expandableMenu"
              :to="'/' +locale + '/' + 'fileManagements'"
            >
              <!-- filesList -->
              <router-link
                class="block"
                :to="'/' +locale + '/' + 'fileManagements' +'/'+'filesList'"
              >
                <q-icon name="fas fa-copy" />
                {{$t('filesList')}}
              </router-link>
              <router-link
                class="block"
                :to="'/' +locale + '/' +'fileManagements' +'/'+'uploadFile'"
              >
                <q-icon name="fa fa-upload" />
                {{$t('uploadFile')}}
              </router-link>
            </q-expansion-item>
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
    return {};
  },
};
</script>

<style lang="scss">
// MainMenu
.mainMenuLi {
  // padding: 12px;
  transition: linear 0.25s;
  a {
    color: #000;
    font-size: 17px;
  }
  &:hover {
    transition: linear 0.25s;
    background-color: #e7e7e7;
  }
}
.expandableMenu {
  a {
    padding: 12px 24px;
    font-size: 16px;
  }
  .q-item__label {
    font-size: 17px;
  }
  .q-expansion-item__content {
    padding: 0px 48px;
    background-color: #f0f0f0;
    border: 1px solid #e9e9e9;
    a {
      border-bottom: 1px solid #d2d2d2;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        color: $primary;
      }
    }
  }
}
.noneExpandableMenu {
  padding: 12px 16px;
  display: block;
  i {
    padding-right: 16px;
    font-size: 24px;
    min-width: 56px;
    text-align: center;
  }
}
</style>
