<template >
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md loginForm"
    >
      <!-- user name -->
      <q-input  outlined class="inputFieldText"
                    color="light-blue-10" v-model="FirstName"
                    label="FirstName"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 ]">
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>
      <!-- last name -->
      <q-input  outlined class="inputFieldText"
                    color="light-blue-10" v-model="LastName"
                    label="LastName"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 ]">
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>
    </q-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      Gender: '',
      PassWord: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('Loged In');
    },
  },
};
</script>
