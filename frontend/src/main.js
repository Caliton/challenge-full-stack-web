import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './plugins/axios'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import LayoutTitle from './components/layout/layoutTitle.vue'
import VueTheMask from 'vue-the-mask'
import vueDebounce from 'vue-debounce'
import locales from './locales/locales.js'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false

axios({ Vue })

Vue.use(VueTheMask)
Vue.use(vueDebounce)
Vue.use(Vuelidate)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: locales
})

Vue.component('l-title', LayoutTitle)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
