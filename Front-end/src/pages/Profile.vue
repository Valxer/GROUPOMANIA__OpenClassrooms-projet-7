<template>
  <q-page class="flex flex-center">
    <q-item class="column profileHolder bg-white">
      <div class="row justify-around q-mx-auto q-mb-md">
        <q-item-section avatar>
          <q-avatar>
            <img class="profilePic" :src="profilePic">
          </q-avatar>
        </q-item-section>

        <q-item-section class="card-header">
          <q-item-label>{{name}}</q-item-label>
        </q-item-section>
      </div>
      <q-btn
          @click="suppress = true"
          text-color="primary"
          color="secondary"
          icon-right="eva-trash-2-outline"
          label="Supprimer le profil"
        />
    </q-item>
    <q-dialog v-model="suppress" persistent>
      <q-card>
        <q-card-section class="column items-center">
          <q-avatar icon="eva-trash-2-outline" color="primary" text-color="accent" />
          <span class="q-mt-md q-ml-sm">Êtes-vous sûr de vouloir supprimer votre compte ?<br/>Celà supprimera toutes vos données et vos posts.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Confirmer" color="primary" @click="deleteUser"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import Auth from '../services/Auth'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup () {
    return {
      suppress: ref(false),
      error: null
    }
  },
  computed:{
    ...mapState('client', ['profilePic', 'name', 'id'])
  },
  methods: {
    ...mapActions('client', ['setToken', 'setName', 'setId', 'setProfilePic', 'setPrivileges']),
    async deleteUser() {
      try {
        const response = await Auth.deleteUser({
          id: this.id
        })
        console.log(response.data.message)
        sessionStorage.clear()
        this.setName(null)
        this.setId(null)
        this.setProfilePic(null)
        this.setPrivileges(null)
        this.setToken(null)
        console.log('Deconnecting...')
        this.$router.push({
          name: 'login'
        })
      } catch (error) {
        console.log('error :',error)
        this.error = error.response.data.error
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .profileHolder {
    border-radius: 5px;
  }
</style>
