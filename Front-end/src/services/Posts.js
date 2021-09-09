import { api } from 'boot/axios'

export default {
    getFeed() {
        return api.get('feed')
    },
    createPost(content) {
        return api.post('post', content)
    },
    getPost(postId) {
        return api.get('post/:id', postId)
    },
    deletePost() {
        return api.delete('post/:id')
    }
}