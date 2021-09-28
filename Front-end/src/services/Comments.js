import { api } from 'boot/axios'

export default {
    deleteComment(id) {
        const path = 'comment/' + id.id
        return api.delete(path)
    },
    createComment(content) {
        console.log('content :', content)
        const path = 'post/' + content.postId
        return api.post(path , content)
    }
}
