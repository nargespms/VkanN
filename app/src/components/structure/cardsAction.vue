<template>
  <div class="cardAction">
    <q-card class="card" :style="{border:'1px solid' + this.data.bg}">
      <q-card-section
        class="usrInfoAvatar cardSectionWrapper bgCardPart"
        :style="{background:data.bg}"
      >
        <router-link v-if="!unclickable" :to="url" class="text-white cardLinkInner">
          <q-icon :name="data.icon" />
          <span v-if="!data.cardLabel" class="fnb cardName">{{$t(name)}}</span>
          <span v-if="data.cardLabel">{{$t(data.cardLabel)}}</span>
          <span
            class="numberCardData"
            v-if="this.data.number || this.data.number === 0"
          >{{localizeNumber }}</span>
        </router-link>

        <div v-if="unclickable" class="text-white">
          <q-icon :name="data.icon" />
          <span v-if="!data.cardLabel" class="fnb cardName">{{$t(name)}}</span>
          <span v-if="data.cardLabel">{{$t(data.cardLabel)}}</span>
          <span
            class="numberCardData"
            v-if="this.data.number || this.data.number === 0"
          >{{localizeNumber }}</span>
        </div>
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
  // props: ['data', 'unclickable'],
  props: {
    data: Object,
    unclickable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: this.data.cardName,
      url: `/${this.$route.params.locale}/${this.data.parentUrl}/${this.data.cardName}`,
      localizeNum: this.data.number,
    };
  },
  computed: {
    localizeNumber() {
      return this.localizeNum.toLocaleString(`${this.$route.params.locale}`);
    },
  },
};
</script>

<style lang="scss">
.cardAction {
  @media screen and (min-width: 980px) {
    width: 310px;
  }
  @media screen and (max-width: 980px) and (min-width: 480px) {
    width: 50%;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 0 !important;
  }
  float: left;
  margin-bottom: 12px;
  padding: 0px 24px;
  .card {
    width: 100%;
    height: 130px;
    i {
      font-size: 52px;
      vertical-align: middle;
      // padding-right: 24px;
      @media screen and (max-width: 768px) {
        font-size: 35px !important;
      }
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
.cardLinkInner {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.cardName {
  font-size: 18px;
}
.bgCardPart {
  height: 100px;
  border-bottom-right-radius: unset !important;
  border-bottom-left-radius: unset !important;
}
</style>


