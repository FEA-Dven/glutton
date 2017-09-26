import Vue from 'vue'
import Router from 'vue-router'
import Log from '../components/log.vue'
import Reg from '../components/reg.vue'
import Send from '../components/send.vue'
import Home from '../components/home.vue'
import Mine from '../components/mine.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  { path: '/log', name: 'log', component: Log },
  { path: '/reg', name: 'reg', component: Reg },
  { path: '/send', name: 'send', component: Send },
  { path: '/home', name: 'home', component: Home },
  { path: '/mine', name: 'mine', component: Mine },
  ]
})
