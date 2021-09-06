<template>
  <q-page class="flex flex-center constrain">
    <div class="constrain form-container column">
      <q-input
        class="col q-mb-md textInput"
        autogrow
        v-model="post.title"
        label="Légende"
        label-color="primary"
        color="primary" />
      <q-file
        class="q-mx-auto"
        v-model="post.imageUrl"
        label="Choisir une image ou gif"
        outlined
        counter
        :counter-label="post.counterLabelFn"
        max-files="1"
        bg-color="secondary"
        label-color="accent"
        style="width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <q-btn
        class="q-mt-xl q-mx-auto"
        unelevated
        rounded
        color="primary"
        text-color="secondary"
        label="Partager le post"
        style="width: 300px"
        />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { uid } from 'quasar';

export default defineComponent({
  name: 'NewPost',
  data() {
    return {
      post:{
        id: uid(),
        title: ref(''),
        date: Date.now(),
        imageUrl: ref(null),
        counterLabelFn ({ totalSize, filesNumber, maxFiles }) {
          return `${filesNumber} files of ${maxFiles} | ${totalSize}`
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .form-container {
    @media (min-width: $breakpoint-sm-min){
      width: 80%;
      max-width: 950px;
    }
  }
</style>
