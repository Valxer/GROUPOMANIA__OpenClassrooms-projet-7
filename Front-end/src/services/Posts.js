import { api } from 'boot/axios'

export default {
    getFeed() {
        return api.get('api/feed')
    },
    createPost(content, token) {
        return api.post('api/post', content, {headers: {'Authorization': `Bearer ${token}`}})
    },
    getPost(id, token) {
        const path = 'api/post/' + id
        return api.get(path, {headers: {'Authorization': `Bearer ${token}`}})
    },
    editPost(id, content, token) {
        const path = 'api/post/edit/' + id
        // console.log('path :', path, '\ncontent :', content, '\ntoken :', token)
        return api.put(path, content, {headers: {'Authorization': `Bearer ${token}`}})
    },
    deletePost(id, token) {
        const path = 'api/post/' + id
        return api.delete(path, {headers: {'Authorization': `Bearer ${token}`}})
    }
}