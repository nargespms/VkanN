<template >
  <div class="ticketFormWrap">
    <div class="ticketForm">
      <form>
        <q-input filled class="ticketTitle" :label="$t('ticketTitle')" v-model.trim="ticket.title" />
        <div class="clear">
          <!-- choose departman for ticet -->
          <q-select
            filled
            :label="$t('departman')"
            v-model.trim="ticket.departamn"
            :options="departmans"
            class="w30 pt20 pr24"
          >
            <template v-slot:prepend>
              <q-icon name="far fa-building" />
            </template>
          </q-select>
          <!-- choose priority -->
          <q-select
            filled
            :label="$t('priority')"
            v-model.trim="ticket.priority"
            :options="priorities"
            class="w30 pt20 pr24"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-sort-amount-up" />
            </template>
          </q-select>
          <!-- choose service Name -->
          <q-select
            filled
            class="pt20"
            v-model.trim="ticket.serviceName"
            :options="FilterOption"
            :label="$t('serviceName')"
            lazy-rules
            :rules="[ val => val && val.length > 0 ]"
            @filter="filterFn"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
          >
            <template v-slot:prepend>
              <q-icon name="settings_applications" />
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">No results</q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div>
          <editor />
        </div>
      </form>
      <!-- {{this.ticket}} -->
    </div>
  </div>
</template>

<script>
import editor from '../structure/editor.vue';

export default {
  name: 'ticketForm',
  props: ['choosedDep'],
  components: {
    editor,
  },
  data() {
    return {
      FilterOption: this.servicesName,
      servicesName: ['service1', 'service2', 'service3', 'الکسا', 'رکنا'],
      departmans: [
        this.$t('billing'),
        this.$t('support'),
        this.$t('information'),
      ],
      priorities: [
        this.$t('emergency'),
        this.$t('middle'),
        this.$t('take your time'),
      ],
      ticket: {
        title: '',
        departamn: this.$t(`${this.choosedDep}`),
        priority: '',
        serviceName: '',
      },
    };
  },
  methods: {
    // for auto compelete
    filterFn(val, update) {
      // call abort() at any time if you can't retrieve data somehow
      setTimeout(() => {
        update(() => {
          if (val === '') {
            this.FilterOption = this.servicesName;
          } else {
            const needle = val.toLowerCase();
            this.FilterOption = this.servicesName.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      }, 500);
    },
  },
};
</script>

<style lang="scss">
.ticketForm {
  background-color: #fff;
  border: 2px solid #d7d7d7;
  padding: 12px;
  width: 70%;
  margin: 24px auto;
  .ticketTitle {
    width: 100%;
  }
  .ticketDep {
    width: calc(100% / 2 - 32px);
  }
}
</style>
