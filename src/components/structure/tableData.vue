<template >
  <div>
    <q-table
      :data="data1"
      :columns="columns1"
      row-key="name"
      :title="$t('userManagement')"
      :filter="filter"
      :separator="separator"
      :pagination.sync="pagination"
      :dense="$q.screen.lt.md"
      binary-state-sort
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
          <q-td key="fullName" :props="props">
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
  </div>
</template>

<script>
export default {
  name: 'tableData',
  data() {
    return {
      filter: '',
      data1: this.data,
      columns1: this.columns,
      separator: 'cell',
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 5,
      },
    };
  },
  props: ['data', 'columns'],
};
</script>
