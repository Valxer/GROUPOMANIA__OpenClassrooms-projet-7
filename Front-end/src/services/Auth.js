import { api } from 'boot/axios'

export default {
    signin(credentials) {
        return api.post('api/signin', credentials)
    },
    login(credentials) {
        return api.post('api/login', credentials)
    },
    deleteUser(id, token) {
        const path = 'api/profile/' + id.id
        return api.delete(path, {headers: {'Authorization': `Bearer ${token}`}})
    }
}


