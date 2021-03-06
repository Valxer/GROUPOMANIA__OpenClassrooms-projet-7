import { api } from 'boot/axios'

export default {
    deleteComment(id, token) {
        const path = 'api/comment/' + id.id
        return api.delete(path, {headers: {'Authorization': `Bearer ${token}`}})
    },
    createComment(content, token) {
        const path = 'api/post/' + content.postId
        return api.post(path , content, {headers: {'Authorization': `Bearer ${token}`}})
    }
}
