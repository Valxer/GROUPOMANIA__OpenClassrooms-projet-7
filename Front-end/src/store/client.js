const state = {
    id: null,
    token: null,
    name: null,
    profilePic: null,
    isLoggedIn: false,
    isAdmin: false
}

const mutations = {
    setToken (state, token) {
        state.token = token
        if (state.token) {
            state.isLoggedIn = true
            // console.log('logged in')
        } else {
            state.isLoggedIn = false
            // console.log('logged out')
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
    },
    setPrivileges (state, role) {
        if (role === 'admin') {
            // console.log('Welcome admin')
            state.isAdmin = true
        }
        else {
            // console.log('Hello random')
            state.isAdmin = false
        }
    }
}

const actions = {
    setToken ({commit}, token) {
        // console.log('setting up token')
        commit('setToken', token)
    },
    setName ({commit}, name) {
        // console.log('setting up name')
        commit('setName', name)
    },
    setId ({commit}, id) {
        // console.log('settting up id')
        commit('setId', id)
    },
    setProfilePic ({commit}, profilePic) {
        // console.log('setting up profile pic')
        commit('setProfilePic', profilePic)
    },
    setPrivileges({commit}, role) {
        // console.log('setting up privileges')
        commit('setPrivileges', role)
    }
}

const getters = {
    token: state => state.token
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
