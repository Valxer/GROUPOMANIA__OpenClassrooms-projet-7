const state = {
    token: null,
    name: null,
    profilePic: null,
    isLoggedIn: false
}

const mutations = {
    setToken (state, token) {
        state.token = token
        if (state.token) {
            state.isLoggedIn = true
            console.log('logged in')
        } else {
            state.isLoggedIn = false
            console.log('logged out')
        }
    },
    setName (state, name) {
        state.name = name
    }
}

const actions = {
    setToken ({commit}, token) {
        console.log('setting up token')
        commit('setToken', token)
    },
    setName ({commit}, name) {
        console.log('setting up name')
        commit('setName', name)
    },
}

const getters = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
