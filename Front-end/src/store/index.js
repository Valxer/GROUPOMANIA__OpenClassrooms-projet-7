import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import posts from './posts'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      posts
    },
    strict: true
  })
  return Store
})
