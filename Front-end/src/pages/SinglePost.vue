<template>
  <q-page class="constrain q-pa-xl">
    <div class="feedsection row justify-center q-gutter-xl q-mb-xl">
      <q-card
        class="my-card"
        :key="data.post.id"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img class="profilePic" src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section class="card-header">
            <q-item-label>{{data.post.ownerId}}</q-item-label>
            <q-item-label caption>{{niceDate(data.post.date)}}</q-item-label>
          </q-item-section>
        </q-item>
        <img class="mainPic" :src="data.post.image">
        <q-card-section class="card-footer">
          <div class="text-subtitle1 text-weight-medium text-center">{{data.post.title}}</div>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        class="phone-only"
        to="/post"
        fab
        icon="eva-plus-outline"
        color="primary"
        text-color="accent"
      />
      <q-btn
        class="desktop-only text-bold createbtn q-mr-md"
        to="/post"
        text-color="accent"
        color="primary"
        icon-right="eva-plus-outline"
        label="Créer un post"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import Posts from '../services/Posts'

export default defineComponent({
  name: 'SinglePost',
  data() {
    return {
        data: {
            post: {
                id: 1,
                title: "Le pont d'Avignon",
                ownerId: 1,
                date: 1631169953600,
                image: "https://i.imgur.com/SnuAkUm.jpeg",
                createdAt: "2021-09-09T07:35:42.775Z",
                updatedAt: "2021-09-09T07:35:42.775Z"
            }
        }
    }
  },
  methods: {
    niceDate: function(value) {
      return date.formatDate(value, 'Le D MMMM à HH:mm', {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      });
    }
  },
  async mounted () {
      this.data = (await Posts.getPost(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))).data
      console.log(this.data)
  }
})
</script>
