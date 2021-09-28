import { api } from 'boot/axios'

export default {
    deleteComment(id) {
        const path = 'comment/' + id.id
        return api.delete(path)
    }
}