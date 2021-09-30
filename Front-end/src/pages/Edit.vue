<template>
  <q-page class="flex flex-center constrain">
    <div class="feedsection row justify-center q-gutter-xl q-mb-xl">
      <q-card
      v-if="isFetched"
        class="post-card"
        :key="post.post.id"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img class="profilePic" :src="post.post.profilePic">
            </q-avatar>
          </q-item-section>
          <q-item-section class="card-header">
            <q-item-label>{{post.post.name}}</q-item-label>
            <q-item-label caption>{{niceDate(post.post.date)}}</q-item-label>
          </q-item-section>
        </q-item>
        <img class="mainPic" :src="post.post.image">
        <q-card-section class="card-footer q-mb-sm">
          <div class="text-subtitle1 text-weight-medium text-center">{{post.post.title}}</div>
        </q-card-section>
      </q-card>
    </div>



    <div class="constrain form-container column">
      <q-input
        class="col q-mb-md textInput"
        autogrow
        v-model="editedPost.title"
        label="Titre"
        label-color="primary"
        color="primary" />
      <q-file
        class="q-mx-auto"
        v-model="imageUpload"
        label="Choisir une image ou gif"
        outlined
        accept="image/*"
        bg-color="secondary"
        label-color="accent"
        style="width: 300px"
        @change="fileHandler"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
      <q-btn
        class="q-mt-xl q-mx-auto"
        unelevated
        rounded
        color="primary"
        text-color="secondary"
        label="Modifier le post"
        style="width: 300px"
        @click="editPost"
        />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Posts from '../services/Posts'
import { mapState } from 'vuex'
import { date } from 'quasar'

export default defineComponent({
  name: 'Edit',
  data() {
    return {
      post: null,
      editedPost:{
        userId: null,
        title: '',
        image: ''
      },
      isFetched: false,
      imageUpload: []
    }
  },
  computed:{
    ...mapState('client', ['id', 'token'])
  },
  methods: {
    niceDate: function(value) {
      return date.formatDate(value, 'Le D MMMM à HH:mm', {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      });
    },
    fileHandler() {
      this.editedPost.image = this.imageUpload
    },
    async editPost() {
      this.editedPost.userId = this.id
      let formData = new FormData()
      for ( var key in this.editedPost ) {
        if (this.editedPost[key]){
            formData.append(key, this.editedPost[key])
        }
      }
      const postId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
      try{
        const response = await Posts.editPost(postId, formData, this.token)
        this.$router.push({
          name: 'feed'
        })
      } catch (error) {
        console.log('error :', error)
        this.error = error.response.data.error
      }
    }
  },
    async mounted () {
        this.post = (await Posts.getPost(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))).data
        this.isFetched = true
    }
})
</script>

<style lang="scss" scoped>
    .post-card {
        max-height: 480px;
        max-width: 85%;
        margin-top: 75px;
    }
    .mainPic {
        max-height: 75%;
        object-fit: cover;
    }
  .form-container {
    margin-bottom: 30px;
    @media (min-width: $breakpoint-sm-min){
      width: 80%;
      max-width: 950px;
    }
  }
</style>
