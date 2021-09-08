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
            console.log('logged in')
            state.isLoggedIn = true
        } else {
            state.isLoggedIn = false
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
