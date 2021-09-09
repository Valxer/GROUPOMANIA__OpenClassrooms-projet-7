
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
        component: () => import('src/pages/Feed.vue')
      },
      { path: 'profile',
        name: 'profile',
        component: () => import('src/pages/Profile.vue')
      },
      { path: 'post',
        name: 'post',
        component: () => import('src/pages/NewPost.vue')
      },
      {
        path: 'post/:id',
        name: 'singlePost',
        component: () => import('src/pages/SinglePost.vue')
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
