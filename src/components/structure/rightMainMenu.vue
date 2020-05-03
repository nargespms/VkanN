<template>
  <q-drawer
    v-model="localLeftDrawerOpen"
    bordered
    content-class="bg-white"
    :mini="miniState"
    :breakpoint="980"
    @hide="hideMenu"
  >
    <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
      <div v-if="mobileSize || !miniState" class="absolute-bottom bg-transparent">
        <router-link
          :to="
            '/' +
              locale +
              '/' +
              'profile' +
              '/' +
              `${$store.state.module1.userData.id}`
          "
        >
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </router-link>

        <div>
          <router-link
            class="text-weight-bold text-white"
            :to="
              '/' +
                locale +
                '/' +
                'profile' +
                '/' +
                `${$store.state.module1.userData.id}`
            "
          >
            {{ this.userData.firstName }}
            {{ this.userData.lastName }}
            <p>{{ this.userData.role }}</p>
          </router-link>
        </div>
      </div>
    </q-img>
    <q-scroll-area
      style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
    >
      <q-list>
        <q-btn
          v-if="!this.mobileSize"
          :class="miniState ? '' : 'pl8'"
          center
          unelevated
          icon="menu"
          @click="miniState = !miniState"
        />
        <div class="mainMenuWrapper">
          <ul>
            <!-- home route -->
            <li class="mainMenuLi">
              <q-item class="p8">
                <router-link class="noneExpandableMenu" :to="'/' + locale + '/' + 'dashboard'">
                  <q-item-section avatar>
                    <q-icon name="fas fa-home" class="fn18" />
                  </q-item-section>
                  <q-item-section>{{ $t('dashboard') }}</q-item-section>
                </router-link>
              </q-item>
            </li>
            <li class="mainMenuLi">
              <q-item class="p8">
                <!-- profile route -->
                <router-link class="noneExpandableMenu" :to="'/' + locale + '/' + 'profile'">
                  <q-item-section avatar>
                    <q-icon name="fas fa-address-card" class="fn18" />
                  </q-item-section>
                  <q-item-section>{{ $t('profile') }}</q-item-section>
                </router-link>
              </q-item>
            </li>
            <!-- userManagement route -->
            <li class="mainMenuLi" v-if="$store.state.module1.userData.role !== 'CLIENT'">
              <q-expansion-item
                icon="supervisor_account"
                :label="$t('userManagement')"
                expand-icon-toggle
                class="expandableMenu"
                :to="'/' + locale + '/' + 'userManagement'"
              >
                <router-link
                  v-if="
                    $store.state.module1.userData.role !== 'MEMBER' &&
                      $store.state.module1.userData.role !== 'CLIENT'
                  "
                  class="block"
                  :to="'/' + locale + '/' + 'userManagement' + '/' + 'staffs'"
                >
                  <q-icon name="fa fa-table pr12" />
                  {{ $t('staffs') }}
                </router-link>
                <router-link
                  class="block"
                  :to="'/' + locale + '/' + 'userManagement' + '/' + 'clients'"
                >
                  <q-icon name="fa fa-table pr12" />
                  {{ $t('clients') }}
                </router-link>
                <router-link
                  v-if="$store.state.module1.userData.role === 'MANAGER'"
                  class="block"
                  :to="'/' + locale + '/' + 'userManagement' + '/' + 'addMember'"
                >
                  <q-icon name="fas fa-plus pr1" />
                  {{ $t('addMember') }}
                </router-link>
              </q-expansion-item>
            </li>

            <li class="mainMenuLi">
              <q-expansion-item
                expand-icon-toggle
                class="expandableMenu"
                icon="system_update_alt"
                :label="$t('tickets')"
                :to="'/' + locale + '/' + 'tickets'"
              >
                <!-- tickets list-->
                <router-link
                  class="block"
                  :to="'/' + locale + '/' + 'tickets' + '/' + 'ticketsList'"
                >
                  <q-icon name="fa fa-table" />
                  {{ $t('ticketsList') }}
                </router-link>
                <!-- add new tickets -->
                <router-link class="block" :to="'/' + locale + '/' + 'tickets' + '/' + 'addTicket'">
                  <q-icon name="fas fa-plus" />
                  {{ $t('addTicket') }}
                </router-link>
              </q-expansion-item>
            </li>
            <!-- my tasks route -->
            <li class="mainMenuLi" v-if="$store.state.module1.userData.role !== 'CLIENT'">
              <q-expansion-item
                expand-icon-toggle
                class="expandableMenu"
                icon="play_for_work"
                :label="$t('tasks')"
                :to="'/' + locale + '/' + 'tasks'"
              >
                <router-link class="block" :to="'/' + locale + '/' + 'tasks' + '/' + 'myTasksList'">
                  <q-icon name="fa fa-table" />
                  {{ $t('mytasks') }}
                </router-link>
                <router-link
                  v-if="$store.state.module1.userData.role === 'MANAGER'"
                  class="block"
                  :to="'/' + locale + '/' + 'tasks' + '/' + 'tasksList'"
                >
                  <q-icon name="fa fa-table" />
                  {{ $t('tasksList') }}
                </router-link>
                <router-link class="block" :to="'/' + locale + '/' + 'tasks' + '/' + 'addTask'">
                  <q-icon name="fas fa-plus" />
                  {{ $t('addTask') }}
                </router-link>
                <router-link class="block" :to="'/' + locale + '/' + 'tasks' + '/' + 'kanBoard'">
                  <q-icon name="fa fa-table" />
                  {{ $t('kanBoard') }}
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
                :to="'/' + locale + '/' + 'services'"
              >
                <router-link
                  class="block"
                  :to="'/' + locale + '/' + 'services' + '/' + 'servicesList'"
                >
                  <q-icon name="fa fa-table pr12" />
                  {{ $t('servicesList') }}
                </router-link>
                <router-link
                  v-if="
                    ($store.state.module1.userData.role === 'MANAGER' &&
                      $store.state.module1.userData.department === 'GENERAL') ||
                      ($store.state.module1.userData.role === 'MANAGER' &&
                        $store.state.module1.userData.department === 'TECH') ||
                      ($store.state.module1.userData.role === 'MANAGER' &&
                        $store.state.module1.userData.department ===
                          'BILLING') ||
                      ($store.state.module1.userData.role === 'ASSISTANT' &&
                        $store.state.module1.userData.department ===
                          'GENERAL') ||
                      ($store.state.module1.userData.role === 'ASSISTANT' &&
                        $store.state.module1.userData.department === 'TECH') ||
                      ($store.state.module1.userData.role === 'ASSISTANT' &&
                        $store.state.module1.userData.department === 'BILLING')
                  "
                  class="block"
                  :to="'/' + locale + '/' + 'services' + '/' + 'addService'"
                >
                  <q-icon name="fas fa-plus pr12" />
                  {{ $t('addService') }}
                </router-link>
              </q-expansion-item>
            </li>

            <!-- billing route -->

            <li
              class="mainMenuLi"
              v-if="$store.state.module1.userData.department !== 'TECH'&&
              $store.state.module1.userData.department !== 'INFO'"
            >
              <q-expansion-item
                icon="attach_money"
                :label="$t('billing')"
                caption
                expand-icon-toggle
                class="expandableMenu"
                :to="'/' + locale + '/' + 'billing'"
              >
                <q-expansion-item
                  icon="fas fa-file-invoice-dollar"
                  :label="$t('invoices')"
                  expand-icon-toggle
                >
                  <!-- invoice route -->
                  <router-link
                    class="block"
                    :to="
                      '/' +
                        locale +
                        '/' +
                        'billing' +
                        '/' +
                        'invoices' +
                        '/' +
                        'invoicesList'
                    "
                  >
                    <q-icon name="fa fa-table pr12" />
                    {{ $t('invoicesList') }}
                  </router-link>
                  <router-link
                    v-if="$store.state.module1.userData.role !== 'CLIENT'"
                    class="block"
                    :to="
                      '/' +
                        locale +
                        '/' +
                        'billing' +
                        '/' +
                        'invoices' +
                        '/' +
                        'addInvoice'
                    "
                  >
                    <q-icon name="fas fa-plus pr12" />
                    {{ $t('addInvoice') }}
                  </router-link>
                </q-expansion-item>

                <!-- contract route -->
                <q-expansion-item
                  icon="fas fa-handshake"
                  :label="$t('contracts')"
                  caption
                  expand-icon-toggle
                  class="expandableMenu"
                  :to="'/' + locale + '/' + 'billing' + '/' + 'contracts'"
                >
                  <router-link
                    v-if="
                      $store.state.module1.userData.role !== 'CLIENT' &&
                        $store.state.module1.userData.role !== 'MEMBER'
                    "
                    class="block"
                    :to="
                      '/' +
                        locale +
                        '/' +
                        'billing' +
                        '/' +
                        'contracts' +
                        '/' +
                        'addContract'
                    "
                  >
                    <q-icon name="fas fa-plus pr12" />
                    {{ $t('addContract') }}
                  </router-link>
                  <router-link
                    class="block"
                    :to="
                      '/' +
                        locale +
                        '/' +
                        'billing' +
                        '/' +
                        'contracts' +
                        '/' +
                        'contractsList'
                    "
                  >
                    <q-icon name="fa fa-table pr12" />
                    {{ $t('contractsList') }}
                  </router-link>
                </q-expansion-item>
              </q-expansion-item>
            </li>
            <!-- tags management -->
            <li
              class="mainMenuLi"
              v-if="
                $store.state.module1.userData.role !== 'CLIENT' &&
                  $store.state.module1.userData.role !== 'MEMBER'
              "
            >
              <q-item class="p8">
                <!-- tags -->
                <router-link class="noneExpandableMenu" :to="'/' + locale + '/' + 'tags'">
                  <q-item-section avatar>
                    <q-icon name="fas fa-tags" class="fn18" />
                  </q-item-section>
                  <q-item-section>{{ $t('tagsManagement') }}</q-item-section>
                </router-link>
              </q-item>
            </li>
            <!-- file management -->
            <li class="mainMenuLi">
              <q-expansion-item
                icon="fa fa-file"
                :label="$t('fileManagements')"
                caption
                expand-icon-toggle
                class="expandableMenu"
                :to="'/' + locale + '/' + 'fileManagements'"
              >
                <!-- filesList -->
                <router-link
                  class="block"
                  :to="
                    '/' + locale + '/' + 'fileManagements' + '/' + 'filesList'
                  "
                >
                  <q-icon name="fas fa-copy" class="fn18" />
                  {{ $t('filesList') }}
                </router-link>
                <router-link
                  class="block"
                  :to="
                    '/' + locale + '/' + 'fileManagements' + '/' + 'uploadFile'
                  "
                >
                  <q-icon name="fa fa-upload" />
                  {{ $t('uploadFile') }}
                </router-link>
              </q-expansion-item>
            </li>
          </ul>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
export default {
  name: 'rightMainMenu',
  props: ['locale', 'leftDrawerOpen', 'mobileSize'],
  data() {
    return {
      localLeftDrawerOpen: false,
      miniState: false,
    };
  },
  watch: {
    /* If our prop ever gets changed outside of this component then we need to update our local data version of the prop */
    leftDrawerOpen(newVal) {
      this.localLeftDrawerOpen = newVal;
    },
    //  it is used for handling avatar
    mobileSize(newVal) {
      this.avatar = newVal;
    },
  },

  mounted() {
    /* As soon as the component is mounted convert our passed prop into data */
    this.localLeftDrawerOpen = this.leftDrawerOpen;
  },
  methods: {
    hideMenu() {
      // console.log('hided');
      this.$emit('backFalse', this.leftDrawerOpen);
    },
  },
  computed: {
    userData() {
      return this.$store.state.module1.userData;
    },
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

  // .q-icon::before {
  //   justify-content: unset !important;
  // }
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
    padding: 0px 18px;
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
  display: flex;
  i {
    font-size: 24px;
    min-width: 56px;
    text-align: center;
  }
}
</style>
