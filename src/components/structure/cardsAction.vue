<template>
  <div class="cardAction">
    <q-card class="card" :style="{border:'1px solid' + this.data.bg}">
      <q-card-section class="usrInfoAvatar" :style="{background:data.bg}">
        <router-link :to="url" class="text-white">
          <q-icon :name="data.icon" />
          <span class="fnb">{{$t(name)}}</span>
          <span class="numberCardData">{{data.number}}</span>
        </router-link>
      </q-card-section>
      <!-- optional -->
      <!-- <q-card-actions class="bg-white">
        <span :style="{color:this.data.bg}">{{$t('viewDetails')}}</span>
      </q-card-actions>-->
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'cardsAction',
  props: ['data'],
  data() {
    return {
      name: this.data.cardName,
      url: `/${this.$route.params.locale}/userManagement/${this.data.cardName}`,
    };
  },
};
</script>

<style lang="scss">
.cardAction {
  width: calc(100% / 5 - 24px);
  margin-bottom: 12px;
  padding: 0px 24px;
  .card {
    width: 100%;
    i {
      font-size: 60px;
      vertical-align: middle;
      padding-right: 24px;
    }
  }
}
.usrInfoAvatar {
  width: 100%;
}
.numberCardData {
  float: right;
  font-size: 24px;
}
.q-card__section {
  padding: 24px;
}
</style>


