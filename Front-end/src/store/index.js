import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import client from './client'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      client
    },
    plugins:[createPersistedState()]
  })
  return Store
})
