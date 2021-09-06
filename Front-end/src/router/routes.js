
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
        component: () => import('src/pages/Feed.vue')
      },
      { path: 'profile',
        component: () => import('src/pages/Profile.vue')
      },
      { path: 'post',
        component: () => import('src/pages/NewPost.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
