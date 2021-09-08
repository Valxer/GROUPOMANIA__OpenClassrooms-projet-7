import { api } from 'boot/axios'

export default {
    getFeed() {
        return api.get('feed')
    },
    createPost(content) {
        return api.post('post', content)
    },
    updatePost(content) {
        return api.post('post/:id', content)
    },
    deletePost() {
        return api.delete('post/:id')
    }
}