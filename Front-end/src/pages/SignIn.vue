<template>
  <q-page class="flex flex-center">
    <div class=" column login-container">
      <q-input
        class=" q-mb-xl textInput"
        autogrow
        v-model="user.name"
        label="Pseudo"
        label-color="primary"
        color="primary" 
      />
      <q-file
        class="q-mx-auto fileUploader"
        v-model="imageUpload"
        label="Photo de profil"
        outlined
        accept="image/*"
        bg-color="secondary"
        label-color="primary"
        style="width: 200px"
        @input="captureImage"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
      <q-input
        class="q-mt-lg q-mb-md textInput"
        autogrow
        v-model="user.email"
        label="Email"
        label-color="primary"
        color="primary" 
      />
      <q-input
        class=" q-mb-md textInput"
        autogrow
        v-model="user.password"
        label="Mot de Passe"
        label-color="primary"
        color="primary" 
      />
      <q-btn
        class="q-ma-xl"
        to="/feed"
        text-color="primary"
        color="secondary"
        icon-right="eva-edit-outline"
        label="S'inscrire"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignIn',
  data() {
    return {
      user: {
        name: '',
        profilePic: null,
        email: '',
        password: '' 
      },
      imageUpload: []
    }
  },
  methods: {
    captureImage(file) {
      this.user.profilePic = file
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
