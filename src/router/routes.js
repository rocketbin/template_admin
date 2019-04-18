const navAdmin = (to, from, next) => {
  next()
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/dashboard/dashboard.vue') },
      { path: 'templates', component: () => import('pages/templates/templates.vue') },
    ],
    beforeEnter: navAdmin
  },
  {
    path: '/login',
    component: () => import('layouts/login.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/admin.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
