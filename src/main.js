import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
