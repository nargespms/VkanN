/* eslint-disable func-names */
// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

const CopyWebpackPlugin = require('copy-webpack-plugin');
const cors = require('cors');

// eslint-disable-next-line no-unused-vars
module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'i18n',
      'axios',
      'vuelidate',
      'normalizeEmail',
      // 'information',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      // 'app.scss',
      'global.scss',
      'stickyListTable.scss',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      // iconSet: 'ionicons-v4', // Quasar icon set
      lang: 'fa-ir',

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',

      components: [
        // '  ',
        // 'QLayout',
        // 'QHeader',
        // 'QFooter',
        // 'QDrawer',
        // 'QPageContainer',
        // 'QPage',
        // 'QToolbar',
        // 'QToolbarTitle',
        // 'QBtn',
        // 'QIcon',
        // 'QList',
        // 'QItem',
        // 'QItemSection',
        // 'QItemLabel',
        // 'QBtnToggle',
        // 'QSelect',
        // 'QCard',
        // 'QTabs',
        // 'QTabPanels',
      ],

      directives: [
        'Ripple',
      ],

      // Quasar plugins
      plugins: [
        'Loading',
        'Notify',
        'Dialog',
        'Cookies',
      ],
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: true,

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      scopeHoisting: true,
      rtl: true,
      vueRouterMode: 'history',
      showProgress: false,
      // gzip: true,
      // analyze: true,
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            // eslint-disable-next-line global-require
            formatter: require('eslint').CLIEngine.getFormatter('stylish'),
          },
        });
        cfg.module.rules.push({
          resourceQuery: /blockType=i18n/,
          use: [{
              loader: '@kazupon/vue-i18n-loader'
            },
            {
              loader: 'yaml-loader'
            },
          ],
        });
          cfg.plugins.push(new CopyWebpackPlugin([{ from: 'src/rootFolder/', to: '' }]));
      },
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
       headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
      https: true,
      // before (app) {
      //    app.use(cors());
      // },
      port: 8083,
      host:'crm.tld',
      // pubilc: 'https://crm.tld',
      open: true, // opens browser window automatically
    //   allowedHosts: [
    //   'https://crm.tld',
    // ],
      //  proxy: {
      //   // proxy all requests starting with /api to jsonplaceholder
      //   '/v1/api/vkann': {
      //     target: this.$axios.defaults.baseURL,
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/v1/api/vkann': ''
      //     }
      //   }
      // }
    },


    animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    // animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'aasaamCrm',
        // short_name: 'aasaamCrm',
        // description: 'is an app for Customer relationship management',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      // bundler: 'builder', // or 'packager'

      // extendWebpack(cfg) {
      //   // do something with Electron main process Webpack cfg
      //   // chainWebpack also available besides this extendWebpack
      // },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'aasaam_crm'
      },
    },
  };
};
