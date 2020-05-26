<template>
  <q-layout view="hHr LpR lff">
    <header-wrapper :locale="locale" />
    <headerTinyInfo :locale="locale" />
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        :duration="300"
        mode="out-in"
      >
        <router-view />
      </transition>
    </q-page-container>
    <footerContent />
  </q-layout>
</template>

<script>
import headerWrapper from '../components/header/headerWrapper.vue';
import footerContent from '../components/footer/footerContent.vue';
import headerTinyInfo from '../components/header/headerTinyInfo.vue';

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
    headerTinyInfo,
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
