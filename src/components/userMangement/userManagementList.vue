<template>
  <div class="userManagementListWrap">
    <q-table
      class="my-sticky-header-table"
      :title="$t('userManagement')"
      :data="data"
      :columns="columns"
      :filter="filter"
      :pagination.sync="pagination"
      row-key="name"
      :dense="$q.screen.lt.md"
      binary-state-sort
      :separator="separator"
      :loading="loading"
      @request="loadData"
    >
      <!-- search field -->
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" :placeholder="$t('Search')">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <!-- custom rows -->

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            <router-link
              class="listNameTable"
              :to="'/' +$route.params.locale + '/' + 'profile'"
            >{{ props.row.name }}</router-link>
            <q-btn
              class="expandTable"
              :props="props"
              v-if="props.row.desc"
              key="desc"
              dense
              round
              flat
              :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
              @click="props.expand = !props.expand"
            />
          </q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="mobileNumber" :props="props">{{ props.row.mobileNumber }}</q-td>
          <q-td key="role" :props="props">{{ props.row.role }}</q-td>
          <q-td key="todoTask" :props="props">{{ props.row.todoTask }}</q-td>
          <q-td key="freeTime" :props="props">{{ props.row.freeTime }}</q-td>
          <q-td key="weeklyTime" :props="props">{{ props.row.weeklyTime }}</q-td>
          <q-td key="status" :props="props">{{ props.row.status }}</q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">{{ props.row.desc }}.</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- <span>click on me to load data</span>
    <span>{{data}}</span>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
      },
      separator: 'cell',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'name',
          align: 'left',
          sortable: true,
        },
        {
          name: 'email',
          required: true,
          label: 'email',
          align: 'left',
          sortable: true,
        },
        {
          name: 'mobileNumber',
          required: true,
          label: 'mobileNumber',
          align: 'left',
          sortable: false,
        },
        {
          name: 'role',
          required: true,
          label: 'role',
          align: 'left',
          sortable: true,
        },
        {
          name: 'todoTask',
          required: true,
          label: 'todoTask',
          align: 'left',
          sortable: true,
        },
        {
          name: 'freeTime',
          required: true,
          label: 'freeTime',
          align: 'left',
          sortable: true,
        },
        {
          name: 'weeklyTime',
          required: true,
          label: 'weeklyTime',
          align: 'left',
          sortable: true,
        },
        {
          name: 'status',
          required: true,
          label: 'status',
          align: 'left',
          sortable: true,
        },
      ],

      data: [],
      original: [
        {
          id: 1,
          name: 'Frozen Yogurt',
          desc: 'description for frozen yo',
          email: 159,
          url: 'login',
          mobileNumber: 6.0,
          role: 24,
          todoTask: 4.0,
          freeTime: 87,
          weeklyTime: '14%',
          iron: '1%',
          status: 'active',
        },
        {
          id: 2,
          name: 'Ice cream sandwich',
          desc: 'description for ice cream ',
          email: 237,
          mobileNumber: 9.0,
          role: 37,
          todoTask: 4.3,
          freeTime: 129,
          weeklyTime: '8%',
          iron: '1%',
          status: 'inactive',
        },
        {
          id: 3,
          name: 'Eclair',
          email: 262,
          mobileNumber: 16.0,
          role: 23,
          todoTask: 6.0,
          freeTime: 337,
          weeklyTime: '6%',
          iron: '7%',
          status: 'active',
        },
        {
          id: 4,
          name: 'Cupcake',
          email: 305,
          mobileNumber: 3.7,
          role: 67,
          todoTask: 4.3,
          freeTime: 413,
          weeklyTime: '3%',
          iron: '8%',
          status: 'inactive',
        },
        {
          id: 5,
          name: 'Gingerbread',
          email: 356,
          mobileNumber: 16.0,
          role: 49,
          todoTask: 3.9,
          freeTime: 327,
          weeklyTime: '7%',
          iron: '16%',
        },
        {
          id: 6,
          name: 'Jelly bean',
          email: 375,
          mobileNumber: 0.0,
          role: 94,
          todoTask: 0.0,
          freeTime: 50,
          weeklyTime: '0%',
          iron: '0%',
        },
        {
          id: 7,
          name: 'Lollipop',
          email: 392,
          mobileNumber: 0.2,
          role: 98,
          todoTask: 0,
          freeTime: 38,
          weeklyTime: '0%',
          iron: '2%',
        },
        {
          id: 8,
          name: 'Honeycomb',
          email: 408,
          mobileNumber: 3.2,
          role: 87,
          todoTask: 6.5,
          freeTime: 562,
          weeklyTime: '0%',
          iron: '45%',
        },
        {
          id: 9,
          name: 'Donut',
          email: 452,
          mobileNumber: 25.0,
          role: 51,
          todoTask: 4.9,
          freeTime: 326,
          weeklyTime: '2%',
          iron: '22%',
        },
        {
          id: 10,
          name: 'KitKat',
          email: 518,
          mobileNumber: 26.0,
          role: 65,
          todoTask: 7,
          freeTime: 54,
          weeklyTime: '12%',
          iron: '6%',
        },
        {
          id: 11,
          name: 'Frozen Yogurt-1',
          email: 159,
          mobileNumber: 6.0,
          role: 24,
          todoTask: 4.0,
          freeTime: 87,
          weeklyTime: '14%',
          iron: '1%',
        },
        {
          id: 12,
          name: 'Ice cream sandwich-1',
          email: 237,
          mobileNumber: 9.0,
          role: 37,
          todoTask: 4.3,
          freeTime: 129,
          weeklyTime: '8%',
          iron: '1%',
        },
        {
          id: 13,
          name: 'Eclair-1',
          email: 262,
          mobileNumber: 16.0,
          role: 23,
          todoTask: 6.0,
          freeTime: 337,
          weeklyTime: '6%',
          iron: '7%',
        },
        {
          id: 14,
          name: 'Cupcake-1',
          email: 305,
          mobileNumber: 3.7,
          role: 67,
          todoTask: 4.3,
          freeTime: 413,
          weeklyTime: '3%',
          iron: '8%',
        },
        {
          id: 15,
          name: 'Gingerbread-1',
          email: 356,
          mobileNumber: 16.0,
          role: 49,
          todoTask: 3.9,
          freeTime: 327,
          weeklyTime: '7%',
          iron: '16%',
        },
        {
          id: 16,
          name: 'Jelly bean-1',
          email: 375,
          mobileNumber: 0.0,
          role: 94,
          todoTask: 0.0,
          freeTime: 50,
          weeklyTime: '0%',
          iron: '0%',
        },
        {
          id: 17,
          name: 'Lollipop-1',
          email: 392,
          mobileNumber: 0.2,
          role: 98,
          todoTask: 0,
          freeTime: 38,
          weeklyTime: '0%',
          iron: '2%',
        },
        {
          id: 18,
          name: 'Honeycomb-1',
          email: 408,
          mobileNumber: 3.2,
          role: 87,
          todoTask: 6.5,
          freeTime: 562,
          weeklyTime: '0%',
          iron: '45%',
        },
        {
          id: 19,
          name: 'Donut-1',
          email: 452,
          mobileNumber: 25.0,
          role: 51,
          todoTask: 4.9,
          freeTime: 326,
          weeklyTime: '2%',
          iron: '22%',
        },
        {
          id: 20,
          name: 'KitKat-1',
          email: 518,
          mobileNumber: 26.0,
          role: 65,
          todoTask: 7,
          freeTime: 54,
          weeklyTime: '12%',
          iron: '6%',
        },
        {
          id: 21,
          name: 'Frozen Yogurt-2',
          email: 159,
          mobileNumber: 6.0,
          role: 24,
          todoTask: 4.0,
          freeTime: 87,
          weeklyTime: '14%',
          iron: '1%',
        },
        {
          id: 22,
          name: 'Ice cream sandwich-2',
          email: 237,
          mobileNumber: 9.0,
          role: 37,
          todoTask: 4.3,
          freeTime: 129,
          weeklyTime: '8%',
          iron: '1%',
        },
        {
          id: 23,
          name: 'Eclair-2',
          email: 262,
          mobileNumber: 16.0,
          role: 23,
          todoTask: 6.0,
          freeTime: 337,
          weeklyTime: '6%',
          iron: '7%',
        },
        {
          id: 24,
          name: 'Cupcake-2',
          email: 305,
          mobileNumber: 3.7,
          role: 67,
          todoTask: 4.3,
          freeTime: 413,
          weeklyTime: '3%',
          iron: '8%',
        },
        {
          id: 25,
          name: 'Gingerbread-2',
          email: 356,
          mobileNumber: 16.0,
          role: 49,
          todoTask: 3.9,
          freeTime: 327,
          weeklyTime: '7%',
          iron: '16%',
        },
        {
          id: 26,
          name: 'Jelly bean-2',
          email: 375,
          mobileNumber: 0.0,
          role: 94,
          todoTask: 0.0,
          freeTime: 50,
          weeklyTime: '0%',
          iron: '0%',
          status: 'active',
        },
        {
          id: 27,
          name: 'Lollipop-2',
          email: 392,
          mobileNumber: 0.2,
          role: 98,
          todoTask: 0,
          freeTime: 38,
          weeklyTime: '0%',
          iron: '2%',
          status: 'inactive',
        },
        {
          id: 28,
          name: 'Honeycomb-2',
          email: 408,
          mobileNumber: 3.2,
          role: 87,
          todoTask: 6.5,
          freeTime: 562,
          weeklyTime: '0%',
          iron: '45%',
          status: 'inactive',
        },
        {
          id: 29,
          name: 'Donut-2',
          email: 452,
          mobileNumber: 25.0,
          role: 51,
          todoTask: 4.9,
          freeTime: 326,
          weeklyTime: '2%',
          iron: '22%',
          status: 'active',
        },
        {
          id: 30,
          name: 'KitKat-2',
          email: 518,
          mobileNumber: 26.0,
          role: 65,
          todoTask: 7,
          freeTime: 54,
          weeklyTime: '12%',
          iron: '6%',
          status: 'inactive',
        },
        {
          id: 31,
          name: 'Frozen Yogurt-3',
          email: 159,
          mobileNumber: 6.0,
          role: 24,
          todoTask: 4.0,
          freeTime: 87,
          weeklyTime: '14%',
          iron: '1%',
          status: 'active',
        },
        {
          id: 32,
          name: 'Ice cream sandwich-3',
          email: 237,
          mobileNumber: 9.0,
          role: 37,
          todoTask: 4.3,
          freeTime: 129,
          weeklyTime: '8%',
          iron: '1%',
          status: 'active',
        },
        {
          id: 33,
          name: 'Eclair-3',
          email: 262,
          mobileNumber: 16.0,
          role: 23,
          todoTask: 6.0,
          freeTime: 337,
          weeklyTime: '6%',
          iron: '7%',
          status: 'inactive',
        },
        {
          id: 34,
          name: 'Cupcake-3',
          email: 305,
          mobileNumber: 3.7,
          role: 67,
          todoTask: 4.3,
          freeTime: 413,
          weeklyTime: '3%',
          iron: '8%',
          status: 'active',
        },
        {
          id: 35,
          name: 'Gingerbread-3',
          email: 356,
          mobileNumber: 16.0,
          role: 49,
          todoTask: 3.9,
          freeTime: 327,
          weeklyTime: '7%',
          iron: '16%',
          status: 'inactive',
        },
        {
          id: 36,
          name: 'Jelly bean-3',
          email: 375,
          mobileNumber: 0.0,
          role: 94,
          todoTask: 0.0,
          freeTime: 50,
          weeklyTime: '0%',
          iron: '0%',
          status: 'active',
        },
        {
          id: 37,
          name: 'Lollipop-3',
          email: 392,
          mobileNumber: 0.2,
          role: 98,
          todoTask: 0,
          freeTime: 38,
          weeklyTime: '0%',
          iron: '2%',
          status: 'active',
        },
        {
          id: 38,
          name: 'Honeycomb-3',
          email: 408,
          mobileNumber: 3.2,
          role: 87,
          todoTask: 6.5,
          freeTime: 562,
          weeklyTime: '0%',
          iron: '45%',
          status: 'active',
        },
        {
          id: 39,
          name: 'Donut-3',
          email: 452,
          mobileNumber: 25.0,
          role: 51,
          todoTask: 4.9,
          freeTime: 326,
          weeklyTime: '2%',
          iron: '22%',
          status: 'active',
        },
        {
          id: 40,
          name: 'KitKat-3',
          email: 518,
          mobileNumber: 26.0,
          role: 65,
          todoTask: 7,
          freeTime: 54,
          weeklyTime: '12%',
          iron: '6%',
          status: 'active',
        },
      ],
    };
  },
  mounted() {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  methods: {
    loadData() {
      this.$axios
        .get('/statics/user.json')
        .then(response => {
          this.data = response.data;
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem',
          });
        });
    },
    onRequest(props) {
      const {
        page,
        rowsPerPage,
        rowsNumber,
        sortBy,
        descending,
      } = props.pagination;
      const { filter } = props;

      this.loading = true;

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        // fetch data from "server"
        const returnedData = this.fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending
        );

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData);

        // don't forget to update local pagination object
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;

        // ...and turn of loading indicator
        this.loading = false;
      }, 1500);
    },
    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer(startRow, count, filter, sortBy, descending) {
      let data = [];

      if (!filter) {
        data = this.original.slice(startRow, startRow + count);
      } else {
        let found = 0;
        for (
          let index = startRow, items = 0;
          index < this.original.length && items < count;
          ++index
        ) {
          const row = this.original[index];
          // match filter?
          if (!row.name.includes(filter)) {
            // get a different row, until one is found
            // eslint-disable-next-line no-continue
            continue;
          }
          ++found;
          if (found >= startRow) {
            data.push(row);
            ++items;
          }
        }
      }

      // handle sortBy
      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a;
          const y = descending ? a : b;
          if (sortBy === 'desc') {
            // string sort
            // eslint-disable-next-line no-nested-ternary
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0;
          }
          // numeric sort
          return parseFloat(x[sortBy]) - parseFloat(y[sortBy]);
        });
      }

      return data;
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount(filter) {
      if (!filter) {
        return this.original.length;
      }
      let count = 0;
      this.original.forEach(treat => {
        if (treat.name.includes(filter)) {
          // edited
          count = +1;
        }
      });
      return count;
    },
  },
};
</script>

<style lang="scss">
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
.userManagementListWrap {
  .q-field__native,
  .q-field__prefix,
  .q-field__suffix {
    color: #fff !important;
  }
  .q-icon {
    color: #fff;
  }
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
    font-family: 'ShabnamBold';
    font-size: 16px;
  }
}
</style>
