const routes = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'logout', component: () => import('pages/LogoutPage.vue') },
      { path: 'entretien', component: () => import('pages/EntretienPage.vue') },
      { path: '/:catchAll(.*)*', redirect: '/login' }
      // Ajoutez d'autres routes ici
    ]
  }
]

export default routes
