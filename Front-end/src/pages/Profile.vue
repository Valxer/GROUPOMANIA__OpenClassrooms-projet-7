<template>
  <q-page class="flex flex-center">
    <q-item class="column profileHolder bg-white">
      <div class="row justify-around q-mx-auto q-mb-md">
        <q-item-section avatar>
          <q-avatar>
            <img class="profilePic" src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section class="card-header">
          <q-item-label>Pseudo</q-item-label>
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
          <span class="q-mt-md q-ml-sm">Êtes-vous sûr de vouloir supprimmer votre compte ?<br/>Celà supprimera toutes vos données et vos posts.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Confirmer" color="primary" to="/signin" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup () {
    return {
      suppress: ref(false)
    }
  },
  computed:{
    ...mapState(['profilePic', 'name'])
  }
})
</script>

<style lang="scss" scoped>
  .profileHolder {
    border-radius: 5px;
  }
</style>
