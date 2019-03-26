const navAdmin = (to, from, next) => {
  next('/admin')
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ],
    beforeEnter: navAdmin
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
