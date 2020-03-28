<template>
  <div>
    <q-table
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :separator="separator"
      :pagination.sync="innerPagination"
      binary-state-sort
      class="my-sticky-header-table"
      @request="onRequest"
      :dense="$q.screen.lt.sm"
      :grid="$q.screen.lt.sm"
    >
      <!-- search field -->
      <template v-slot:top-right>
        <q-input
          class="tableSearchInput"
          borderless
          dense
          debounce="300"
          v-model="filter"
          :placeholder="$t('Search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <!-- custom header -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in columns" :key="col.lable" class="tableHeadCell">
            <!-- name for each column -->
            <span class="columnLabel">{{ $t(col.lable) }}</span>
            <!-- if filterable true in each column it will show an input -->
            <div
              class="columnFilterWrap"
              v-if="col.filterable"
              @click.stop="stopSort"
            >
              <!-- filter column for text -->
              <q-input
                outlined
                color="text-black"
                v-if="col.filterType === 'text'"
                class="filterColumnSearch"
                type="text"
                v-model.trim="columnFilter[col.lable]"
                @input="colFilterChange"
                @click="stopSort"
                :placeholder="$t('search')"
              />
              <!-- filter column for dropboxes -->
              <q-select
                outlined
                v-if="col.filterType === 'DropBox'"
                class="filterColumnSearch dropBoxFilterColumn"
                :options="FilterOption"
                v-model.trim="columnFilter[col.lable]"
                @change="colFilterChange"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                @filter="filterFn"
                @filter-abort="abortFilterFn"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">{{
                      $t('noResults')
                    }}</q-item-section>
                  </q-item>
                </template>
              </q-select>
              <!-- filter column for dates -->
              <!-- start date -->
              <div v-if="col.filterType === 'Date'">
                <q-input
                  outlined
                  v-model.trim="columnFilter.columnFilterStartdate"
                  mask="date"
                  :rules="['date']"
                  :label="$t('startDate')"
                  ref="qDateProxy"
                  name="event"
                  @click="stopSort"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" color="black">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model.trim="columnFilter.columnFilterStartdate"
                          today-btn
                          ok-label
                          calendar="persian"
                        >
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              :label="$t('ok')"
                              color="primary"
                              flat
                              v-close-popup
                            />
                            <q-btn
                              :label="$t('cancel')"
                              color="primary"
                              flat
                              v-close-popup
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <!-- end date -->
                <q-input
                  outlined
                  v-model.trim="columnFilter.columnFilterEnddate"
                  mask="date"
                  :rules="['date']"
                  :label="$t('endDate')"
                  @click="stopSort"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" color="black">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model.trim="columnFilter.columnFilterEnddate"
                          @change="() => $refs.qDateProxy.hide()"
                          today-btn
                          calendar="persian"
                          :options="computDate"
                        >
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              :label="$t('ok')"
                              color="primary"
                              flat
                              v-close-popup
                            />
                            <q-btn
                              :label="$t('cancel')"
                              color="primary"
                              flat
                              v-close-popup
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </q-th>
        </q-tr>
      </template>
      <!-- custom rows -->
      <template v-slot:body="props">
        <q-tr>
          <!-- {{props}} -->
          <!-- <q-td>
            <span>{{$t(props.row.id)}}</span>
          </q-td>-->
          <q-td v-if="props.row.id !== $store.state.module1.userData.id">
            <span>
              <router-link
                class="listNameTable"
                :to="
                  '/' +
                    $route.params.locale +
                    '/' +
                    'userManagement' +
                    '/' +
                    props.row.id
                "
                >{{ props.row.firstName }}</router-link
              >
            </span>
          </q-td>
          <q-td v-if="props.row.id !== $store.state.module1.userData.id">
            <router-link
              class="listNameTable"
              :to="
                '/' +
                  $route.params.locale +
                  '/' +
                  'userManagement' +
                  '/' +
                  props.row.id
              "
            >
              <span>{{ $t(props.row.lastName) }}</span>
            </router-link>
          </q-td>
          <q-td v-if="props.row.id === $store.state.module1.userData.id">
            <span>
              <router-link
                class="listNameTable"
                :to="
                  '/' +
                    $route.params.locale +
                    '/' +
                    'profile' +
                    '/' +
                    props.row.id
                "
                >{{ props.row.firstName }}</router-link
              >
            </span>
          </q-td>
          <q-td v-if="props.row.id === $store.state.module1.userData.id">
            <router-link
              class="listNameTable"
              :to="
                '/' +
                  $route.params.locale +
                  '/' +
                  'profile' +
                  '/' +
                  props.row.id
              "
            >
              <span>{{ $t(props.row.lastName) }}</span>
            </router-link>
          </q-td>
          <q-td class="rtl center">
            <span class="rtl">{{ $t(props.row.mobile) }}</span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.role) }}</span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.department) }}</span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.status) }}</span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.avatar) }}</span>
          </q-td>
        </q-tr>
        <!-- expandable row for extra description -->
      </template>
      <!-- for responsive  -->

      <template v-slot:item="props">
        <q-card class="q-ma-xs q-pa-sm">
          <q-list dense class="mobileList">
            <q-item class="mobileItem" v-for="prop in props.row" :key="prop.id">
              <q-item-section>
                <span v-if="prop == props.row['name']">
                  <router-link
                    class="listNameTable"
                    :to="'/' + $route.params.locale + '/' + 'profile' + '/'"
                    >#{{ props.row.name }}</router-link
                  >
                </span>
                <q-item-label
                  v-if="
                    prop !== props.row['name'] && prop !== props.row['__index']
                  "
                  >{{ prop }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </template>

      <!-- for responsive  -->
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'staffTableData',
  data() {
    return {
      todayDate: new Date(),
      status: ['active', 'inactive '],
      FilterOption: this.status,
      separator: 'cell',
      columnFilter: {
        columnFilterStartdate: new Date(),
        columnFilterEnddate: new Date(),
      },
      filter: '',
      innerPagination: this.pagination,
    };
  },
  props: {
    data: Array,
    columns: Array,
    loading: Boolean,
    pagination: {
      type: Object,
      default: () => ({
        sortBy: 'name',
        descending: false,
        page: 1,
        limit: 5,
        rowsNumber: 10,
      }),
    },
  },
  methods: {
    recordClick(value) {
      this.$emit('onIdClick', value);
    },
    computDate(columnFilterEnddate) {
      return columnFilterEnddate >= this.columnFilter.columnFilterStartdate;
    },
    // for auto compelete
    filterFn(val, update) {
      // call abort() at any time if you can't retrieve data somehow
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.FilterOption = this.status;
          } else {
            const needle = val.toLowerCase();
            this.FilterOption = this.status.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      }, 500);
    },

    abortFilterFn() {
      console.log('delayed filter aborted');
    },
    stopSort(event) {
      event.stopPropagation();
    },
    colFilterChange() {
      this.onRequest({
        pagination: this.innerPagination,
        filter: this.filter,
      });
    },
    onRequest(props) {
      props.columnFilter = this.columnFilter;
      this.innerPagination = props.pagination;
      this.$emit('request', props);
    },
  },
};
</script>

<style lang="scss">
.userManagementListWrap {
  .expandTable {
    .q-icon {
      color: #666;
    }
  }
  .q-table__sort-icon {
    color: #666;
  }
  .q-table__top {
    .q-field__control {
      border-bottom: 1px solid #b4b4b4;
    }
  }
  .listNameTable,
  .q-table thead th {
    color: #000;
    font-size: 16px;
    text-align: center;
  }
}
[dir] .my-sticky-header-column-table td:first-child {
  background-color: #e0e0e0;
}
[dir] .q-table__top {
  background-color: #2f2f2f;
  color: #fff !important;
}
[dir] .q-table__bottom {
  background-color: #2f2f2f;
  color: #fff !important;
}
[dir] .my-sticky-header-column-table tr:first-child th {
  background: #e0e0e0;
}

.filterColumnSearch {
  border-radius: 0;
  background-color: #d8d8d8b3;
  color: #000;
  font-size: 13px;
  margin-top: 8px;
}
.columnFilterWrap {
  .q-field__control {
    height: unset;
    color: #000 !important;
  }
}
.dropBoxFilterColumn {
  padding: 0px;
  border: none;
}
.columnLabel {
  padding-left: 24px;
  margin-top: 12px;
  padding-right: 12px;
}
.mobileList {
  .mobileItem {
    text-align: center;
    border-bottom: 1px solid #d1d1d1;
  }
  :last-child {
    border-bottom: none;
  }
}
.my-sticky-header-table {
  .row {
    justify-content: space-evenly;
  }
}

.q-table--no-wrap th,
.q-table--no-wrap td {
  white-space: pre;
}
.tableSearchInput * {
  color: #fff !important;
}
</style>
