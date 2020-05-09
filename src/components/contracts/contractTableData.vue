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
                v-if="col.lable === 'formal'"
                class="filterColumnSearch dropBoxFilterColumn w150p"
                :options="contractType"
                v-model.trim="filter[col.lable]"
                @input="colFilterChange"
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
                v-if="col.lable === 'status'"
                class="filterColumnSearch dropBoxFilterColumn w150p"
                :options="contractStatus"
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

              <div v-if="col.lable === 'startDate'">
                <q-input
                  outlined
                  v-model="startDate"
                  mask="date"
                  :rules="['date']"
                  :label="$t('date')"
                  name="event"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" color="black">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="startDate" today-btn ok-label calendar="persian">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              :label="$t('ok')"
                              color="primary"
                              flat
                              v-close-popup
                              @click="startSetDate(startDate)"
                            />
                            <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                  <template v-if="startDate" v-slot:prepend>
                    <q-icon name="cancel" @click="startDateNull" class="cursor-pointer" />
                  </template>
                </q-input>
              </div>
              <div v-if="col.lable === 'endDate'">
                <q-input
                  outlined
                  v-model="endDate"
                  mask="date"
                  :rules="['date']"
                  :label="$t('date')"
                  name="event"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer" color="black">
                      <q-popup-proxy
                        ref="qDateProxy1"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="endDate" today-btn ok-label calendar="persian">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn
                              :label="$t('ok')"
                              color="primary"
                              flat
                              v-close-popup
                              @click="endSetDate(endDate)"
                            />
                            <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                  <template v-if="endDate" v-slot:prepend>
                    <q-icon name="cancel" @click="endDateNull" class="cursor-pointer" />
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
                  'contracts' +
                  '/' +
                  props.row.id
              "
            >
              <span>{{ $t(props.row.contractNumber) }}</span>
            </router-link>
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
              new Date(props.row.startDate).toLocaleDateString(
              `${$route.params.locale}`
              )
              }}
            </span>
          </q-td>
          <q-td>
            <span>
              {{
              new Date(props.row.endDate).toLocaleDateString(
              `${$route.params.locale}`
              )
              }}
            </span>
          </q-td>
          <q-td>
            <span class="center block" v-if="props.row.formal">
              <q-icon class="fn18 fnb" name="fa fa-check-circle" color="positive" />
            </span>
            <span class="center block" v-if="!props.row.formal">
              <q-icon class="fn16" name="fa fa-times" color="negative" />
            </span>
          </q-td>
          <q-td>
            <span>{{ $t(props.row.status) }}</span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'contractTableData',
  data() {
    return {
      startDate: '',
      endDate: '',
      contractType: [
        { label: 'FORMAL', value: true },
        { label: 'INFORMAL', value: false },
      ],
      contractStatus: ['VALID', 'TERMINATED', 'EXPIRED'],
      FilterOption: this.status,
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
      return columnFilterEnddate >= this.columnFilter.columnFilterStartdate;
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
    persionToGregorian(value) {
      const dateValue = value.split('/').map(i => parseInt(i, 10));
      return new this.$persianDate(dateValue).toDate().toISOString();
    },

    startSetDate(value) {
      this.filter.startDate = this.persionToGregorian(value);
      this.colFilterChange();
    },
    endSetDate(value) {
      this.filter.endDate = this.persionToGregorian(value);
      this.colFilterChange();
    },
    startDateNull() {
      this.startDate = null;
      delete this.filter.startDate;
      this.colFilterChange();
    },
    endDateNull() {
      this.endDate = null;
      delete this.filter.endDate;
      this.colFilterChange();
    },
  },
};
</script>

<style lang="scss">
.tableListWrap {
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
