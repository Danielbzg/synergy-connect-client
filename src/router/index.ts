import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamNotes from '@/views/TeamNotes.vue'
import Forum from '@/views/Forum.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/teamnotes',
      name: 'team notes',
      component: TeamNotes
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum
    }
  ]
})
export default router
