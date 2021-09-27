<template>
  <q-page class="constrain q-px-xl q-pt-xl q-pb-sm">
    <div class="feedsection row justify-center q-gutter-xl q-mb-xl">
      <!-- <p v-if="isFetched">lecture du titre : {{post.post.title}}</p> -->
      <q-card
      v-if="isFetched"
        class="post-card"
        :key="post.post.id"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img class="profilePic" :src="post.post.profilePic">
            </q-avatar>
          </q-item-section>
          <q-item-section class="card-header">
            <q-item-label>{{post.post.name}}</q-item-label>
            <q-item-label caption>{{niceDate(post.post.date)}}</q-item-label>
          </q-item-section>
        </q-item>
        <img class="mainPic" :src="post.post.image">
        <q-card-section class="card-footer q-mb-sm">
          <div class="text-subtitle1 text-weight-medium text-center">{{post.post.title}}</div>
        </q-card-section>

        <q-separator inset color="primary" />

        <div class="q-my-sm q-ml-md text-subtitle1 text-weight-medium comment-section">Commentaires</div>
        <q-card
          class="comment-card"
          v-for="comment in post.comments"
          :key="comment.id"
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img class="profilePic" :src="comment.profilePic">
              </q-avatar>
            </q-item-section>
            <q-item-section class="comment-header flex-row">
              <q-item-label class="text-caption text-weight-medium">{{comment.name}}</q-item-label>
              <div class="text-caption comment-content">{{comment.content}}</div>
              <q-item-label class="text-caption comment-date" caption>{{niceDate(comment.date)}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>

        <q-separator inset color="primary q-mb-sm q-mt-lg" />

        <div class="q-my=b-sm q-ml-md text-subtitle1 text-weight-medium comment-section">Répondre</div>
        <q-card class="answser-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img class="profilePic" :src="post.post.profilePic">
              </q-avatar>
            </q-item-section>
            <q-item-section class="answer-header">
              <q-input
                class="col q-mb-md textInput"
                autogrow
                v-model="answer.content"
                label="Réponse"
                label-color="primary"
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-card>
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
      post: null,
      isFetched: false,
      answer: {
        content: ''
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
    this.post = (await Posts.getPost(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))).data
    console.log('données post', this.post)
    this.isFetched = true
  }
})
</script>

<style lang="scss" scoped>
  .comment-date {
    font-size: 10px;
  }
  .comment-content{
    line-height: normal;
  }
</style>
