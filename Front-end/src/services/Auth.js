import { api } from 'boot/axios'

export default {
    signin(credentials) {
        return api.post('signin', credentials)
    },
    login(credentials) {
        return api.post('login', credentials)
    },
    deleteUser(id, token) {
        const path = 'profile/' + id.id
        return api.delete(path, {headers: {'Authorization': `Bearer ${token}`}})
    }
}


