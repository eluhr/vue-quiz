import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Quiz from '@/views/Quiz'
import Leaderboard from '@/views/Leaderboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard
    }
  ]
})
