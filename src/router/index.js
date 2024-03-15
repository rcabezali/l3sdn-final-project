import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from 'src/pages/LoginPage.vue'
import ProfilePage from 'src/pages/ProfilePage.vue'
import UserProfilePage from 'pages/UserProfilePage.vue'

const routes = [
  {
    path: '/',
    component: LoginPage,
    name: 'login'
  },
  {
    path: '/profile',
    component: ProfilePage,
    name: 'profile'
  },
  {
    path: '/user-home/:userId',
    component: UserProfilePage,
    name: 'user-home'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
