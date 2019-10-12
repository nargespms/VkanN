<template>
  <q-footer class="footerContent ">
    <div class="con16">
      <!-- footer content -->
      <div class="clear">
        <about-us/>
        <contact-us/>
      </div>
      <copy-right/>
    </div>
  </q-footer>
</template>

<script>
import copyRight from './copyRight.vue';
import aboutUs from './aboutUs.vue';
import contactUs from './contactUs.vue';


export default {
  name: 'footerContent',
  components: {
    copyRight,
    aboutUs,
    contactUs,
  },

};
</script>

<style lang="scss">
.footerContent {
  background-color:#292929;
  color: #e0e0e0;
  padding: 12px;
}
</style>
