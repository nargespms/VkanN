<template>
  <div class="q-pa-lg">
    <!-- user management table -->
    <!-- <userManagementList /> -->
    <div class="userManagementListWrap">
      <tableData :data="data" :columns="columns" />
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

// import userManagementList from '../components/userMangement/userManagementList.vue';
import tableData from '../components/structure/tableData.vue';

export default {
  name: 'staffs',
  components: {
    // userManagementList,
    tableData,
  },
  methods: {
    loadData() {
      this.$axios
        .get('/statics/user.json')
        .then(response => {
          this.data = response.data.data;
          this.columns = response.data.columns;
          console.log(this.data);
          console.log(this.columns);
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
  },
  mounted() {
    this.loadData({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  data() {
    return {
      columns: [
        {
          name: 'fullName',
          required: true,
          label: 'fullName',
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
      data: [
        {
          id: 1,
          name: 'Customer1',
          desc: 'description for Custumer1',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 4,
          weeklyTime: 65,
          status: 'active',
        },
        {
          id: 2,
          name: 'Customer2',
          desc: 'description for Custumer1',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 4,
          weeklyTime: 65,
          status: 'active',
        },
        {
          id: 3,
          name: 'Customer3',
          desc: '',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 4,
          weeklyTime: 65,
          status: 'active',
        },
        {
          id: 4,
          name: 'Customer4',
          desc: 'description for Custumer1',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 4,
          weeklyTime: 65,
          status: 'active',
        },
        {
          id: 5,
          name: 'Customer5',
          desc: 'description for Custumer1',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 4,
          weeklyTime: 65,
          status: 'active',
        },
        {
          id: 6,
          name: 'Customer6',
          desc: 'description for Custumer1',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 4,
          weeklyTime: 65,
          status: 'active',
        },
        {
          id: 7,
          name: 'Customer7',
          desc: 'description for Custumer1',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 4,
          weeklyTime: 65,
          status: 'active',
        },
        {
          id: 8,
          name: 'Customer8',
          desc: 'description for Custumer1',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 45,
          weeklyTime: 65,
          status: 'active',
        },
        {
          id: 9,
          name: 'Customer9',
          desc: 'description for Custumer1',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 4,
          weeklyTime: 65,
          status: 'active',
        },
        {
          id: 10,
          name: 'Customer10',
          desc: 'description for Custumer1',
          email: 'something@ddd.com',
          url: 'login',
          mobileNumber: '09152369874',
          role: 'custumer',
          todoTask: 44,
          weeklyTime: 65,
          status: 'active',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
</style>
