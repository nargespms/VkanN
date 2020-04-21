<template>
  <div class="contractProfileCmpWrap">
    <div class="item">
      <div class="item-content">
        <span class="introParam">{{ $t('ContractNum') }}</span>
        <span class="valueIntro">{{ data.contractNumber }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('Service') }}</span>
        <router-link
          class="valueIntro"
          :to="
            '/' +
              $route.params.locale +
              '/' +
              'services' +
              '/' +
              data.service._id
          "
        >
          <span class="valueIntro">{{ data.service.name }}</span>
        </router-link>
      </div>

      <div class="item-content">
        <span class="introParam">{{ $t('clientName') }}</span>
        <router-link
          class="valueIntro"
          :to="
            '/' +
              $route.params.locale +
              '/' +
              'userManagement' +
              '/' +
              data.client._id
          "
        >
          <span class="valueIntro">
            {{ data.client.firstName }}
            &nbsp;
            {{ data.client.lastName }}
          </span>
        </router-link>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('status') }}</span>
        <span class="valueIntro">{{ $t(data.status) }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('type') }}</span>
        <span class="valueIntro">{{ $t(data.type) }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('tags') }}</span>
        <div class="valueIntro">
          <p v-for="tag in data.tags" :key="tag._id">{{ tag.title }}</p>
        </div>
      </div>

      <div class="item-content">
        <span class="introParam">{{ $t('startDate') }}</span>
        <span class="valueIntro">
          {{
          new Date(data.startDate).toLocaleDateString(`${$route.params.locale}`)
          }}
        </span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('endDate') }}</span>
        <span class="valueIntro">
          {{
          new Date(data.endDate).toLocaleDateString(`${$route.params.locale}`)
          }}
        </span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('currency') }}</span>
        <span class="valueIntro">{{ $t(data.currency) }}</span>
      </div>
      <div class="item-content">
        <span class="introParam">{{ $t('attachments') }}</span>
        <span class="valueIntro">{{ data.attachments }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contractProfileCmp',
  props: ['data'],
};
</script>

<style lang="scss">
.contractProfileCmpWrap {
  @media screen and (max-width: 800px) {
    width: 100%;
  }
  @media screen and (min-width: 800px) {
    width: 80%;
  }

  .item {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #f3f3f3;
    padding: 12px;
    .item-content {
      display: flex;
      width: calc(100%);
      border-bottom: 1px solid #ededed;
      padding: 12px;
      &:last-child {
        border-bottom: none;
      }
      .introParam {
        color: #000;
        font-size: 16px;
        width: 50%;
        display: inline-block;
      }
      .valueIntro {
        color: #027be3;
        width: 50%;
        display: inline-block;
        font-size: 15px;
      }
    }
  }
}
</style>
