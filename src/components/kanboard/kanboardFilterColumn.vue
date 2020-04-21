<template >
  <div>
    <q-list bordered separator class="bg-grey-3 kanboardFilterColumn">
      <q-item>
        <q-item-section>
          <q-input
            outlined
            stack-label
            required
            color="grey-9"
            class="bg-white w100"
            v-model.trim="filter.title"
            :label="$t('title')"
            @input="colFilterChange"
            debounce="1000"
          >
            <template v-if="filter.title" v-slot:append>
              <q-icon name="cancel" @click.stop="filter.title = null" class="cursor-pointer" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            outlined
            stack-label
            required
            color="grey-9"
            class="bg-white"
            v-model.trim="filter.id"
            :label="$t('taskNum')"
            @input="colFilterChange"
            debounce="1000"
          >
            <template v-if="filter.id" v-slot:append>
              <q-icon name="cancel" @click.stop="filter.id = null" class="cursor-pointer" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-select
            outlined
            color="grey-9"
            class="bg-white w100"
            :options="priorities"
            v-model.trim="filter.priority"
            @input="colFilterChange"
            debounce="1000"
            :label="$t('priority')"
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
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            outlined
            v-model="dueDate"
            mask="date"
            :rules="['date']"
            :label="$t('dueDate')"
            name="event"
            class="bg-white pb0"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" color="black">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model.trim="dueDate" today-btn ok-label calendar="persian">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        :label="$t('ok')"
                        color="primary"
                        flat
                        v-close-popup
                        @click="dateSet(dueDate)"
                      />
                      <q-btn :label="$t('cancel')" color="primary" flat v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>


<script>
export default {
  name: 'kanboardFilterColumn',
  data() {
    return {
      priorities: ['CRITICAL', 'IMPORTANT', 'NORMAL', 'LOW'],
      filter: {},
      dueDate: '',
    };
  },
  methods: {
    persionToGregorian(value) {
      const dateValue = value.split('/').map(i => parseInt(i, 10));
      return new this.$persianDate(dateValue).toDate().toISOString();
    },

    dateSet(value) {
      this.filter.dueDate = this.persionToGregorian(value);
      this.colFilterChange();
    },
    colFilterChange() {
      this.$emit('getFilterColumn', this.filter);
    },
  },
};
</script>
