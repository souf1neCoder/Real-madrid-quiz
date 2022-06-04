import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:"RM Quiz"
    }
  },
  {
    path: '/madridista-quiz',
    name: 'Quiz',
    component: () => import('../views/Quiz.vue'),
    meta:{
      title:"RM Quiz Go"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  document.title = `${to.meta.title}`;
  next();
})
export default router
