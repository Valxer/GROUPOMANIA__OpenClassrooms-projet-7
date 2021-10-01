<template>
  <q-page class="flex flex-center constrain">
    <div class="constrain form-container column">
      <q-input
        class="col q-mb-md textInput"
        autogrow
        v-model="post.title"
        label="Légende"
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
      <div
        class="error constrain"
        v-html="error" 
      />
      <q-btn
        class="q-mt-xl q-mx-auto"
        unelevated
        rounded
        color="primary"
        text-color="secondary"
        label="Partager le post"
        style="width: 300px"
        @click="submitPost"
        />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Posts from '../services/Posts'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'NewPost',
  data() {
    return {
      post:{
        userId: null,
        title: '',
        date: Date.now(),
        image: ''
      },
      imageUpload: [],
      error: null
    }
  },
  computed:{
    ...mapState('client', ['id', 'token'])
  },
  methods: {
    fileHandler() {
      this.post.image = this.imageUpload
    },
    async submitPost() {
      this.post.userId = this.id
      let formData = new FormData()
      for ( var key in this.post ) {
        formData.append(key, this.post[key]);
      }
      try{
        const response = await Posts.createPost(formData, this.token)
        this.$router.push({
          name: 'feed'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .form-container {
    @media (min-width: $breakpoint-sm-min){
      width: 80%;
      max-width: 950px;
    }
  }
  .error {
    color: red;
    max-width: 300px;
  }
</style>
