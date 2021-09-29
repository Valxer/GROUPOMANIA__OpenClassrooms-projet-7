<template>
  <q-page class="constrain q-pa-xl">
    <div class="feedsection row justify-center q-gutter-xl q-mb-xl">
      <q-card
        @click="goToPost(post.id)"
        class="my-card"
        v-for="post in feed"
        :key="post.id"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img class="profilePic" :src="post.profilePic">
            </q-avatar>
          </q-item-section>

          <q-item-section class="card-header">
            <q-item-label>{{post.name}}</q-item-label>
            <q-item-label caption>{{niceDate(post.date)}}</q-item-label>
          </q-item-section>
        </q-item>
        <img class="mainPic" :src="post.image">
        <q-card-section class="card-footer">
          <div class="text-h5 text-weight-medium text-center">{{post.title}}</div>
          <div>
            <q-icon color="primary" name="eva-message-square-outline" size="20px"/>
            {{post.commentCount}}
          </div>
        </q-card-section>
        <!-- <q-card-section class="card-comments center">
          
        </q-card-section> -->
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
  name: 'Feed',
  data() {
    return {
      feed: null
    }
  },
  methods: {
    niceDate: function(value) {
      return date.formatDate(value, 'Le D MMMM à HH:mm', {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      });
    },
    goToPost(value) {
      this.$router.push({
        name: 'singlePost',
        params: {
          id: value
        }
      })
    }
  },
  async mounted () {
    this.feed = (await Posts.getFeed()).data
  }
})
</script>

<style lang="scss" scoped>
  .my-card{
    &:hover{
      pointer-events: fill;
      cursor: pointer;
    }
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
