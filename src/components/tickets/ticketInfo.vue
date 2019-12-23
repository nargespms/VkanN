<template >
  <div class="ticketInfoWrap">
    <div class="ticketInfo">
      <h3>
        <span>#{{data.id}}</span>
        - {{data.title}}
      </h3>
      <q-select
        outlined
        class="ticketStatus"
        v-model.trim="status"
        :label="$t('status')"
        :options="ticketStatus"
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
  </div>
</template>


<script>
export default {
  name: 'ticketInfo',
  props: ['data'],
  data() {
    return {
      ticketStatus: ['OnHold', 'Answered', 'CustomerReply'],
      status: this.data.status,
    };
  },
};
</script>

<style lang="scss">
.ticketInfoWrap {
  padding: 16px;
}
.ticketInfo {
  overflow: auto;
  width: 100%;
  h3 {
    font-size: 18px;
    float: left;
  }
  .ticketStatus {
    float: left;
    width: 200px;
    padding-left: 24px;
  }
}
</style>
