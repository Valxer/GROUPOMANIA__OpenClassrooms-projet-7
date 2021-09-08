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
import { defineComponent } from 'vue'
import { date } from 'quasar'
import { mapGetters } from 'vuex'
import Posts from '../services/Posts'

export default defineComponent({
  name: 'Feed',
  computed: {
    ...mapGetters('posts', ['posts'])
  },
  methods: {
    niceDate: function(value) {
      return date.formatDate(value, 'Le D MMMM à HH:mm', {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      });
    }
  },
  async mounted () {
    this.feed = await Posts.getFeed()
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
