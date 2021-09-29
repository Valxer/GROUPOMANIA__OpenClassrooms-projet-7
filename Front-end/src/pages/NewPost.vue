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
      imageUpload: []
    }
  },
  computed:{
    ...mapState('client', ['id'])
  },
  methods: {
    fileHandler() {
      this.post.image = this.imageUpload
      console.log('imageUpload :', this.imageUpload, 'image', this.post.image)
    },
    async submitPost() {
      this.post.userId = this.id
      let formData = new FormData()
      for ( var key in this.post ) {
        formData.append(key, this.post[key]);
      }
      try{
        const response = await Posts.createPost(formData)
      } catch (error) {
        console.log('error :', error)
        this.error = error.response.data.error
      }
      // console.log('formData :', formData)
      // var object = {};
      // formData.forEach(function(value, key){
      // object[key] = value;
      // })
      // console.log("object :" , object)
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
</style>
