import { api } from 'boot/axios'

export default {
    getFeed() {
        return api.get('feed')
    },
    createPost(content) {
        return api.post('post', content)
    },
    getPost(id) {
        const path = 'post/' + id
        return api.get(path)
    },
    editPost(id) {
        const path = 'post/edit/' + id
        return api.put(path)
    },
    deletePost() {
        return api.delete('post/:id')
    }
}