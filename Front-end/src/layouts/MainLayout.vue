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
          @click="logout"
          text-color="primary"
          color="secondary"
          icon-right="eva-log-out-outline"
          label="Log Out "
        />
      </q-toolbar> 
    </q-header>

    <q-footer
      class="bg-primary"
      elevated
    >
      <q-tabs
        class="text-secondary"
        active-color="accent"
        active-bg-color="positive"
        indicator-color="transparent"
        >
        <q-route-tab
          to="/feed"
          name="Feed"
          icon="eva-home-outline"
          label="Feed" />
        <q-route-tab
          to="/profile"
          name="Profile"
          icon="eva-person-outline"
          label="Profil" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-accent">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'MainLayout',
  methods: {
    ...mapActions('client', ['setName', 'setToken', 'setId', 'setProfilePic', 'setPrivileges']),
    logout() {
      this.setName(null)
      this.setId(null)
      this.setProfilePic(null)
      this.setPrivileges(null)
      this.setToken(null)
      console.log('Deconnecting...')
      this.$router.push({
        name: 'login'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  .q-header {
    height: 65px;
  }

  .mainIcon {
    width: 175px;
    position: absolute;
  }

  .q-tab{
    @media (min-width: $breakpoint-sm-min){
        width: 250px;
    }
  }
</style>
