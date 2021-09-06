<template>
  <q-page class="flex flex-center">
    <q-btn
          @click="suppress = true"
          text-color="primary"
          color="secondary"
          icon-right="eva-trash-2-outline"
          label="Supprimer le profil"
        />
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

export default defineComponent({
  name: 'Login',
  setup () {
    return {
      suppress: ref(false)
    }
  }
})
</script>
