import { api } from 'boot/axios'

export default {
    signin(credentials) {
        return api.post('signin', credentials)
    },
    login(credentials) {
        console.log('credentials recus', credentials)
        return api.post('login', credentials)
    },
    deleteUser(id) {
        const path = 'profile/' + id.id
        return api.delete(path)
    }
}


