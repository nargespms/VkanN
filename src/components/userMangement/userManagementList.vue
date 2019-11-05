<template>
  <div class="userManagementListWrap">
    <q-table
      class="my-sticky-header-table"
      :data="data"
      :columns="columns"
      :filter="filter"
      :pagination.sync="pagination"
      row-key="name"
      :dense="$q.screen.lt.md"
      :sort-method="customSort"
      binary-state-sort
      :separator="separator"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" :placeholder="$t('Search')">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: '',
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      separator: 'cell',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'calories',
          align: 'center',
          label: 'Calories',
          field: 'calories',
          sortable: true,
        },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs', sortable: true },
        {
          name: 'protein',
          label: 'Protein (g)',
          field: 'protein',
          sortable: true,
        },
        {
          name: 'sodium',
          label: 'Sodium (mg)',
          field: 'sodium',
          sortable: true,
        },
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: 'status',
          label: 'status',
          field: 'status',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
      ],

      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          status: 'active',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          status: 'active',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          status: 'active',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          status: 'active',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          status: 'inactive',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          status: 'active',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          status: 'active',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          status: 'inactive',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          status: 'inactive',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          status: 'active',
        },
      ],
    };
  },
  methods: {
    customSort(rows, sortBy, descending) {
      const data = [...rows];

      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a;
          const y = descending ? a : b;
          if (sortBy === 'name') {
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
  },
};
</script>

<style  lang="scss">
[dir] .my-sticky-header-column-table td:first-child {
  background-color: #e0e0e0;
}
[dir] .q-table__top {
  background-color: #96c4f5;
}
[dir] .q-table__bottom {
  background-color: #96c4f5;
}
[dir] .my-sticky-header-column-table tr:first-child th {
  background: #e0e0e0;
}
</style>
