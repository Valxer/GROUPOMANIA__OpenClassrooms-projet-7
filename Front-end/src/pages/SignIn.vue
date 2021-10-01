<template>
  <q-page class="flex flex-center">
    <div class=" column login-container">
      <q-input
        ref="pseudo"
        @keyup.enter="signin"
        @click="resetpseudo"
        class=" q-mb-xl textInput"
        v-model="user.userName"
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
        @change="fileHandler"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
      <q-input
        ref="email"
        @keyup.enter="signin"
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
        @keyup.enter="signin"
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
      <div
        class="error"
        v-html="error" 
      />
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
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'SignIn',
  data() {
    return {
      user: {
        userName: '',
        email: '',
        password: '',
        image: ''
      },
      imageUpload: [],
      isPwd: true,
      error: null
    }
  },
  methods: {
    fileHandler() {
      this.user.image = this.imageUpload
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
    ...mapActions('client', ['setName']),
    async signin() {
      let formData = new FormData()
      for ( var key in this.user ) {
        formData.append(key, this.user[key]);
      }
      try {
        await Auth.signin(formData)
        console.log('User registered !')
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .error {
    color: red;
    max-width: 300px;
  }
</style>
