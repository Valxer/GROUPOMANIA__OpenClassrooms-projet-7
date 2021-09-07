<template>
  <q-page class="constrain q-pa-xl">
    <div class="feedsection row justify-center q-gutter-xl q-mb-xl">
      <q-card
        class="my-card"
        v-for="post in posts"
        :key="post.id"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img class="profilePic" src="https://cdn.quasar.dev/img/avatar2.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section class="card-header">
            <q-item-label>{{post.id}}</q-item-label>
            <q-item-label caption>{{niceDate(post.date)}}</q-item-label>
          </q-item-section>
        </q-item>
        <img class="mainPic" :src="post.imageUrl">
        <q-card-section class="card-footer">
          <div class="text-subtitle1 text-weight-medium text-center">{{post.title}}</div>
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
import { defineComponent } from 'vue';
import { date } from 'quasar'

export default defineComponent({
  name: 'Feed',
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Le pont d\'Avignon',
          date: 1630930047135,
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 2,
          title: 'La bonne binouze !',
          date: 1630987047135,
          imageUrl: 'https://media.giphy.com/media/6S9cWuMVtjfPz1GYqK/giphy.gif?cid=ecf05e47toanwko4c0a21s0re9dlgy0aruy3fbtgz0621grh&rid=giphy.gif&ct=g'
        },
        {
          id: 3,
          title: 'Hello there :)',
          date: 1630997125034,
          imageUrl: 'https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif?cid=ecf05e47cba5b5ec0f18472a00a536ae898d1dd64f41b58f&rid=giphy.gif&ct=g'
        },
        {
          id: 4,
          title: 'Quand tu réussis ton projet sans aucune erreur de compilation du premier coup',
          date: 1630997425034,
          imageUrl: 'https://media.giphy.com/media/bMHRBeuBvMJWkyQYSL/giphy-downsized-large.gif?cid=ecf05e47creg3fl7w9qfhrp2dp3dsvt74wnmpyqy8791vb3i&rid=giphy-downsized-large.gif&ct=g'
        },
      ]
    }
  },
  methods: {
    niceDate: function(value) {
      return date.formatDate(value, 'Le D MMMM à HH:mm', {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      });
    }
  }
})
</script>

<style lang="scss" scoped>
  .my-card{
    width: 100%;
    .mainPic{
      max-height: 600px;
      object-fit: contain;
    }
  }
  .createbtn {
    height: 50px;
    display: flex;
  }
</style>
