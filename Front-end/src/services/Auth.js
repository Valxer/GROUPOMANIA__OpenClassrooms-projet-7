import { api } from 'boot/axios'

export default {
    signin(credentials) {
        return api.post('signin', credentials)
    }
}


