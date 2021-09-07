<template>
  <q-page class="flex flex-center">
    <div class=" column login-container">
      <q-input
        class=" q-mb-md textInput"
        autogrow
        v-model="user.email"
        label="Email"
        label-color="primary"
        color="primary" />
      <q-input
        class=" q-mb-md textInput"
        autogrow
        v-model="user.password"
        label="Mot de Passe"
        label-color="primary"
        color="primary" />
      <q-btn
        class="q-ma-xl"
        to="/feed"
        text-color="primary"
        color="secondary"
        icon-right="eva-log-in-outline"
        label="Log In"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '' 
      }
    }
  }
})
</script>
