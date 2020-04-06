<template>
  <q-card class="taskPacket" @drag="dragged">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
        <q-item-label caption>Subhead</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-icon name="calendar"></q-icon>
      <q-item-section>
        <span>{{ item.dueDate }}</span>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
export default {
  name: 'taskCard',

  props: ['data'],
  data() {
    return {
      item: { ...this.data },
    };
  },
  methods: {
    dragged() {
      this.$emit('dragedItem', this.item);
    },
  },
};
</script>
