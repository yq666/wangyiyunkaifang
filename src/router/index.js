import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/player/:id',
      name: 'player',
      component: require('../views/Player.vue')
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: require('../views/Homepage.vue')
    }
  ]
})
