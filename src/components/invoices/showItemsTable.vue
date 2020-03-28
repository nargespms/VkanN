<template>
  <tr class="invoiceItemRow">
    <td></td>
    <td class="pointer">
      {{ item.code }}
    </td>
    <td class="pointer">
      {{ item.description }}
    </td>
    <td class="pointer">
      {{ item.quantity }}
    </td>
    <td class="pointer">
      {{ item.unit }}
    </td>
    <td class="pointer">{{ item.fee }}{{ $t(currency) }}</td>
    <td>{{ item.total }}{{ $t(currency) }}</td>
    <td class="pointer">{{ item.discount }}{{ $t(currency) }}</td>
    <td>{{ item.totalAfterDiscount }}{{ $t(currency) }}</td>
    <td>{{ itemTaxAmount }}{{ $t(currency) }}</td>
    <td>{{ item.finalTotal }}{{ $t(currency) }}</td>
  </tr>
</template>

<script>
export default {
  name: 'showItemTable',
  props: ['data', 'currency'],
  data() {
    return {
      showing1: false,
      item: { ...this.data },
    };
  },
  computed: {
    itemTaxAmount() {
      return this.item.totalAfterDiscount * 0.09;
    },
  },
};
</script>

<style lang="scss">
.invoiceItemRow {
  td {
    background-color: #e3e3e3;
  }
  .q-btn--round .q-btn__wrapper {
    min-width: 2.5em;
    min-height: 2.5em;
    .q-btn {
      font-size: 20px;
    }
  }
}
</style>
