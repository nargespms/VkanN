<template>
  <div>
    <q-table
      :data="data"
      :columns="columns"
      :rows-per-page-options="[0]"
      row-key="name"
      :filter="tableSearch"
      :separator="separator"
      :pagination.sync="innerPagination"
      binary-state-sort
      class="my-sticky-header-table"
      @request="onRequest"
      :dense="$q.screen.lt.sm"
      :grid="$q.screen.lt.sm"
    >
      <!-- search field -->
      <template v-slot:top-right></template>
      <!-- custom header -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in columns" :key="col.lable" class="tableHeadCell">
            <!-- name for each column -->
            <span class="columnLabel">{{ $t(col.lable) }}</span>
            <!-- if filterable true in each column it will show an input -->
            <div class="columnFilterWrap" v-if="col.filterable" @click.stop="stopSort">
              <q-input
                outlined
                color="text-black"
                v-if="col.filterType === 'text'"
                class="filterColumnSearch"
                type="text"
                v-model.trim="filter[col.lable]"
                @input="colFilterChange"
                debounce="1000"
                @click="stopSort"
                :placeholder="$t('search')"
              />

              <q-select
                outlined
                v-if="col.lable === 'status'"
                class="filterColumnSearch dropBoxFilterColumn w150p"
                :options="status"
                v-model.trim="filter[col.lable]"
                @input="colFilterChange"
                debounce="1000"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label>{{ $t(scope.opt) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="scope">{{ $t(scope.opt)}}</template>
              </q-select>

              <q-select
                outlined
                v-if="col.lable === 'official'"
                class="filterColumnSearch dropBoxFilterColumn w150p"
                :options="official"
                v-model.trim="filter[col.lable]"
                @input="colFilterChange"
                use-input
                debounce="1000"
                emit-value
                map-options
                :option-label="opt => $t(opt.label)"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label>{{ $t(scope.opt.label) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-select
                outlined
                v-if="col.lable === 'type'"
                class="filterColumnSearch dropBoxFilterColumn w150p"
                :options="type"
                v-model.trim="filter[col.lable]"
                @input="colFilterChange"
                debounce="1000"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                    <q-item-section>
                      <q-item-label>{{ $t(scope.opt) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="scope">{{ $t(scope.opt) }}</template>
              </q-select>

              <div v-if="col.filterType === 'Date'">
                <q-input
                  outlined
                  v-model.trim="filter.columnFilterStartdate"
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
                          v-model.trim="filter.columnFilterStartdate"
                          today-btn
                          ok-label
                          calendar="persian"
                        >
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn :label="$t('ok')" color="primary" flat v-close-popup />
                            <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input
                  outlined
                  v-model.trim="filter.columnFilterEnddate"
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
                          v-model.trim="filter.columnFilterEnddate"
                          @change="() => $refs.qDateProxy.hide()"
                          today-btn
                          calendar="persian"
                          :options="computDate"
                        >
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn :label="$t('ok')" color="primary" flat v-close-popup />
                            <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
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
          <q-td>
            <router-link
              class="listNameTable"
              :to="
                '/' +
                  $route.params.locale +
                  '/' +
                  'billing' +
                  '/' +
                  'invoices' +
                  '/' +
                  props.row.id
              "
            >{{ props.row.number }}</router-link>
          </q-td>
          <q-td>
            <router-link
              class="listNameTable"
              :to="
                '/' +
                  $route.params.locale +
                  '/' +
                  'services' +
                  '/' +
                  props.row.service._id
              "
            >
              <span>{{ $t(props.row.service.name) }}</span>
            </router-link>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.total) }}</span>
            <span>{{ $t(props.row.currency) }}</span>
          </q-td>

          <q-td>
            <router-link
              class="listNameTable"
              :to="
                '/' +
                  $route.params.locale +
                  '/' +
                  'userManagement' +
                  '/' +
                  props.row.client._id
              "
            >
              <span>{{ $t(props.row.client.firstName) }} &nbsp;</span>
              <span>{{ $t(props.row.client.lastName) }}</span>
            </router-link>
          </q-td>

          <q-td>
            <span>
              {{
              new Date(props.row.issueDate).toLocaleDateString(
              `${$route.params.locale}`
              )
              }}
            </span>
          </q-td>
          <q-td v-if="props.row.dueDate">
            <span>
              {{
              new Date(props.row.dueDate).toLocaleDateString(
              `${$route.params.locale}`
              )
              }}
            </span>
          </q-td>
          <q-td v-if="props.row.validUntil">
            <span>
              {{
              new Date(props.row.validUntil).toLocaleDateString(
              `${$route.params.locale}`
              )
              }}
            </span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.status) }}</span>
          </q-td>
          <q-td>
            <span class="center block" v-if="props.row.official">
              <q-icon class="fn18 fnb" name="fa fa-check-circle" color="positive" />
            </span>
            <span class="center block" v-if="!props.row.official">
              <q-icon class="fn16" name="fa fa-times" color="negative" />
            </span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.type) }}</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'invoiceTableData',
  data() {
    return {
      todayDate: new Date(),
      status: ['VALID', 'INVALID', 'PAID', 'UNPAID', 'PENDING'],
      official: [
        { label: 'invoiceUnOfficial', value: true },
        { label: 'invoiceOfficial', value: false },
      ],
      type: ['QUOTE', 'INVOICE'],
      separator: 'cell',
      filter: {},
      tableSearch: '',
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
        limit: 10,
        rowsNumber: 10,
      }),
    },
  },
  methods: {
    recordClick(value) {
      this.$emit('onIdClick', value);
    },
    computDate(columnFilterEnddate) {
      return columnFilterEnddate >= this.filter.columnFilterStartdate;
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
      props.filter = this.filter;
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
  display: flex;
  justify-content: center;
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
