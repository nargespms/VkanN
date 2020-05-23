<template>
  <div class="userAvatar">
    <q-card class="my-card">
      <avatarUpload @changAvatar="editAvatar" :UploadButton="false" />
      <q-card-section class="usrInfoAvatar">
        <p>
          <span>{{ this.data.firstName }}</span>
          &nbsp;
          <span>{{ this.data.lastName }}</span>
        </p>
      </q-card-section>
    </q-card>
    <div v-if="data.role === 'CLIENT'">
      <cardsAction class="clientAccess" :data="client.tickets" />
      <cardsAction class="clientAccess" :data="client.invoices" />
    </div>
  </div>
</template>

<script>
import cardsAction from '../structure/cardsAction.vue';
import avatarUpload from '../structure/avatarUpload.vue';

export default {
  name: 'userAvatarCmp',
  props: ['data'],
  components: { cardsAction, avatarUpload },
  data() {
    return {
      client: {
        tickets: {
          icon: 'system_update_alt',
          bg: '#26A69A',
          cardName: `ticketsList?client=${this.data.firstName} ${this.data.lastName}`,
          cardLabel: 'ticketsList',
          parentUrl: 'tickets',
        },
        invoices: {
          icon: 'fas fa-file-invoice-dollar',
          bg: '#ffa900',
          cardName: `invoicesList?client=${this.data.firstName} ${this.data.lastName}`,
          cardLabel: 'invoicesList',
          parentUrl: 'billing/invoices',
        },
      },
    };
  },
  watch: {
    data(newVal) {
      this.client.tickets.cardName = `ticketsList?client=${newVal.firstName} ${newVal.lastName}`;
      this.client.invoices.cardName = `invoicesList?client=${newVal.firstName} ${newVal.lastName}`;
    },
  },
  computed: {
    userData() {
      return this.data;
    },
  },

  methods: {
    editAvatar(value) {
      if (
        this.$route.path
          .split('/')
          .slice(2, 3)
          .toString() === 'profile'
      ) {
        this.$axios.put('/v1/api/vkann/profile', {
          ...this.userData,
          avatarFile: value,
        });
      } else {
        this.$emit('changeAvatar', value);
      }
    },
  },
};
</script>

<style lang="scss">
.userAvatar {
  width: calc(100% / 6);
  padding-right: 16px;
  @media screen and (max-width: 1024px) and (min-width: 640px) {
    width: 30%;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    margin-bottom: 16px;
  }
  img {
    max-width: 100%;
  }
}
.choosePhoto {
  cursor: pointer;
  background-color: #38373799;
  padding: 12px;
  text-align: center;
  color: #fff;
  font-size: 15px;
}
.usrInfoAvatar {
  padding: 12px;
}
.avatarWrapp {
  position: relative;
}
.clientAccess {
  width: 220px;
  float: none;
  margin: 16px auto;
  padding: 0;
}
</style>
