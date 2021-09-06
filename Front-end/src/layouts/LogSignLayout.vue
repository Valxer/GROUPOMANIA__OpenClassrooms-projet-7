<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-primary flex"
     elevated
    >
      <q-toolbar>
        <img
          class="mainIcon"
          src="/icons/icon-left-font.svg"
        >
        <q-space />
        <q-btn
          v-if="!isLogin"
          to="/"
          text-color="primary"
          color="secondary"
          icon-right="eva-log-in-outline"
          label="Log In "
        />
        <q-btn
        class="q-px-sm"
          v-else
          to="/signin"
          text-color="primary"
          color="secondary"
          icon-right="eva-edit-outline"
          label="S'inscrire"
        />
      </q-toolbar>  
    </q-header>
    <q-page-container class="bg-accent">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LogSignLayout',
  computed: {
    isLogin() {
      return this.$route.name == 'login'
    }
  }
})
</script>

<style lang="scss" scoped>
  .q-header {
    height: 65px;
  }
  .mainIcon {
    width: 150px;
    position: absolute;
  }
</style>
