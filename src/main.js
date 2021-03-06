import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@/assets/fonts.css'
import init from "@/firebase/firebase_init"
Vue.config.productionTip = true
init()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
