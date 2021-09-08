import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import posts from './posts'
import client from './client'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      posts,
      client
    },
    strict: true
  })
  return Store
})
