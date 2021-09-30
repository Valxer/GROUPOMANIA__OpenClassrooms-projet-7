
const routes = [
  {
    path: '/',
    component: () => import('layouts/LogSignLayout.vue'),
    children: [
      { path: '',
        name: 'login',
        component: () => import('src/pages/Login.vue')
      },
      { path: 'signin',
        name: 'signin',
        component: () => import('src/pages/SignIn.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'feed',
        name: 'feed',
        component: () => import('src/pages/Feed.vue'),
        meta: { requireAuth: true }
      },
      { path: 'profile',
        name: 'profile',
        component: () => import('src/pages/Profile.vue'),
        meta: { requireAuth: true }
      },
      { path: 'post',
        name: 'post',
        component: () => import('src/pages/NewPost.vue'),
        meta: { requireAuth: true }
      },
      {
        path: 'post/:id',
        name: 'singlePost',
        component: () => import('src/pages/SinglePost.vue'),
        meta: { requireAuth: true }
      },
      {
        path: 'post/edit/:id',
        name: 'edit',
        component: () => import('src/pages/Edit.vue'),
        meta: { requireAuth: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
    meta: { requireAuth: true }
  }
]

export default routes
