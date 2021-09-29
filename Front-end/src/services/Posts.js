import { api } from 'boot/axios'

export default {
    getFeed() {
        return api.get('feed')
    },
    createPost(content, token) {
        return api.post('post', content, {headers: {'Authorization': `Bearer ${token}`}})
    },
    getPost(id) {
        const path = 'post/' + id
        return api.get(path)
    },
    editPost(id, token) {
        const path = 'post/edit/' + id
        return api.put(path, {headers: {'Authorization': `Bearer ${token}`}})
    },
    deletePost(id, token) {
        const path = 'post/' + id
        return api.delete(path, {headers: {'Authorization': `Bearer ${token}`}})
    }
}