import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import client from './client'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      client
    },
    strict: true
  })
  return Store
})
