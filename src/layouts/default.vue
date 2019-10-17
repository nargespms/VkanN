<template>
  <q-layout view="hHr LpR lff">
    <header-wrapper :locale="locale"/>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footerContent/>
  </q-layout>
</template>

<script>
import headerWrapper from '../components/header/headerWrapper.vue';
import footerContent from '../components/footer/footerContent.vue';

export default {
  name: 'MyLayout',

  data() {
    return {
      locale: null,
    };
  },
  components: {
    headerWrapper,
    footerContent,
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale; // load the Quasar language pack dynamically
      this.locale = locale;
      import(`quasar/lang/${locale}`).then(({ default: messages }) => {
        this.$q.lang.set(messages);
      });
    },
  },
  computed: {
    NotUser() {
      return (this.$route.path !== `'/' + ${this.locale} + '/' + 'signIn'`);
    },
  },

  mounted() {
    this.$store.$router.beforeEach((to, from, next) => {
      // Vue.config.lang = to.params.lang;
      this.setLocale(to.params.locale);
      // console.log(to);
      next();
    });
    const { locale = 'fa-ir' } = this.$route.params;
    // console.log(this.$route.params);
    this.setLocale(locale);
  },

};
</script>
