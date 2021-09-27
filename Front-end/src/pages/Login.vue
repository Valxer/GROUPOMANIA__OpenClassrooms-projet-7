<template>
  <q-page class="flex flex-center">
    <div class=" column login-container">
      <q-input
        ref="email"
        @keyup.enter="login"
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
        @keyup.enter="login"
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
        @click="login"
        class="q-ma-xl"
        text-color="primary"
        color="secondary"
        icon-right="eva-log-in-outline"
        label="Log In"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Auth from '../services/Auth'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '' 
      },
      isPwd: true,
      error: null,
    }
  },
  methods: {
    resetemail() {
      this.$refs.email.resetValidation()
    },
    resetpass() {
      this.$refs.pass.resetValidation()
    },
    ...mapActions('client', ['setToken', 'setName', 'setId', 'setProfilePic', 'setPrivileges']),
    async login() {
      try {
        const response = await Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        this.setName(response.data.user.name)
        this.setId(response.data.user.id)
        this.setProfilePic(response.data.user.profilePic)
        this.setToken(response.data.token)
        this.setPrivileges(response.data.user.role)
        console.log('Connexion complete')
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
  .error {
    color: red;
    max-width: 300px;
  }
</style>
