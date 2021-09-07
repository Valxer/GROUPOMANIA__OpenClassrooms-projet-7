<template>
  <q-page class="flex flex-center">
    <div class=" column login-container">
      <q-input
        ref="pseudo"
        @click="resetpseudo"
        class=" q-mb-xl textInput"
        v-model="user.name"
        label="Pseudo"
        label-color="primary"
        color="primary"
        :rules="[val => !!val || 'Champ Obligatoire']"
      />
      <q-file
        class="q-mx-auto"
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
        ref="email"
        @click="resetemail"
        class="q-mt-lg q-mb-md"
        type="email"
        v-model="user.email"
        label="Email"
        label-color="primary"
        color="primary"
        :rules="[val => !!val || 'Champ Obligatoire']"
      />
      <q-input
        ref="pass"
        @click="resetpass"
        class=" q-mb-md"
        :type="isPwd ? 'password' : 'text'"
        v-model="user.password"
        label="Mot de Passe"
        label-color="primary"
        color="primary"
        :rules="[val => !!val || 'Champ Obligatoire']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'eva-eye-off-outline' : 'eva-eye-outline'"
            color="primary"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn
        @click="signin"
        class="q-ma-xl"
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
import Auth from '../services/Auth'

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
      imageUpload: [],
      isPwd: true
    }
  },
  methods: {
    captureImage(file) {
      this.user.profilePic = file
    },
    resetpseudo() {
      this.$refs.pseudo.resetValidation()
    },
    resetemail() {
      this.$refs.email.resetValidation()
    },
    resetpass() {
      this.$refs.pass.resetValidation()
    },
    async signin() {
      await Auth.signin({
        name: this.user.name,
        profilePic: this.user.profilePic,
        email: this.user.email,
        password: this.user.password
      })
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
