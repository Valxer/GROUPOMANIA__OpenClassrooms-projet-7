const state = {
    id: null,
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
    },
    setId (state, id) {
        state.id = id
    },
    setProfilePic (state, profilePic) {
        state.profilePic = profilePic
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
    setId ({commit}, id) {
        console.log('settting up id')
        commit('setId', id)
    },
    setProfilePic ({commit}, profilePic) {
        console.log('setting up profile pic')
        commit('setProfilePic', profilePic)
    }
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
