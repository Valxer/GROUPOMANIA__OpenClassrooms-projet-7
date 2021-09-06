<template>
  <q-page class="flex flex-center">
    <q-btn
          to="/feed"
          text-color="primary"
          color="secondary"
          icon-right="eva-log-in-outline"
          label="Log In"
        />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login'
})
</script>
