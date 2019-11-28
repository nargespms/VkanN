<template>
  <q-layout view="hHr LpR lff">
    <header-wrapper :locale="locale" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <footerContent />
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
      const localeMap = {
        en: 'en-us',
        fa: 'fa-ir',
      };
      this.locale = locale;
      const isoLocale = localeMap[locale] || locale;
      this.$i18n.locale = isoLocale; // load the Quasar language pack dynamically
      import(`quasar/lang/${isoLocale}`).then(({ default: messages }) => {
        this.$q.lang.set(messages);
      });
    },
  },
  computed: {
    NotUser() {
      return this.$route.path !== `'/' + ${this.locale} + '/' + 'signIn'`;
    },
  },

  mounted() {
    this.$store.$router.beforeEach((to, from, next) => {
      this.setLocale(to.params.locale);
      next();
    });
    const { locale = 'fa' } = this.$route.params;
    this.setLocale(locale);
  },
};
</script>
