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
        @input="captureImage"
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
        />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Posts from '../services/Posts'

export default defineComponent({
  name: 'NewPost',
  data() {
    return {
      post:{
        title: '',
        date: Date.now(),
        image: null
      },
      imageUpload: []
    }
  },
  methods: {
    captureImage(file) {
      this.post.image = file
      console.log('imageurl :', this.post.images)
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
