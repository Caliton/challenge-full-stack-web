import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios'
import VueI18n from 'vue-i18n'
import locales from './locales/locales.js'

Vue.config.productionTip = false

axios({ Vue })

const i18n = new VueI18n({
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: locales
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
