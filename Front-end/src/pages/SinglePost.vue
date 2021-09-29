<template>
  <q-page class="constrain q-px-xl q-pt-xl q-pb-sm">
    <div class="feedsection row justify-center q-gutter-xl q-mb-xl">
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
        <div v-if="hasComments">
          <q-card
            class="comment-card"
            v-for="comment in post.comments"
            :key="comment.id"
            flat
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
              <q-btn
              v-if="id == comment.userId"
              class="del-btn"
              @click="selectComment(comment.id)"
              text-color="info"
              flat
              icon-right="eva-close-outline"
              />
              <q-dialog v-model="suppress" persistent>
                <q-card>
                  <q-card-section class="column items-center">
                    <q-avatar icon="eva-trash-2-outline" color="primary" text-color="accent" />
                    <span class="q-mt-md q-ml-sm">Êtes-vous sûr de vouloir supprimer ce commentaire ?</span>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Annuler" color="primary" v-close-popup />
                    <q-btn flat label="Confirmer" color="primary" @click="deleteComment" v-close-popup/>
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-item>
          </q-card>
        </div>
        <div v-else class="q-ml-lg text-caption comment-none">Aucun commentaire</div>
        
        <q-separator inset color="primary q-mb-sm q-mt-lg" />

        <div class="q-my=b-sm q-ml-md text-subtitle1 text-weight-medium comment-section">Commenter</div>
        <q-card class="answser-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img class="profilePic" :src="profilePic">
              </q-avatar>
            </q-item-section>
            <q-item-section class="answer-header">
              <q-input
                class="col q-mb-md textInput"
                autogrow
                v-model="answer.content"
                label="Mon commentaire"
                label-color="rgba(0, 0, 0, 0.54)"
                color="primary"
              />
            </q-item-section>
            <q-btn
              class="create-btn q-mt-md"
              @click="createComment"
              text-color="primary"
              flat
              icon-right="eva-paper-plane-outline"
              />
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
import { ref } from 'vue'
import { date } from 'quasar'
import Posts from '../services/Posts'
import Comments from '../services/Comments'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'SinglePost',
  data() {
    return {
      post: null,
      isFetched: false,
      hasComments: false,
      answer: {
        content: ''
      },
      suppress: ref(false),
      selectedCommentId: null
    }
  },
  computed:{
    ...mapState('client', ['id', 'isAdmin', 'profilePic'])
  },
  methods: {
    niceDate: function(value) {
      return date.formatDate(value, 'Le D MMMM à HH:mm', {
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      });
    },
    selectComment(id) {
      this.selectedCommentId = id
      this.suppress = true
      console.log(this.selectedCommentId)
    },
    handleEnter (e) {
    	if (e.ctrlKey) return console.log('New line', e)
      
    	console.log('Send', e)
    },
    async deleteComment() {
      try {
        const response = await Comments.deleteComment({
          id: this.selectedCommentId
        })
        window.location.reload();
        console.log(response.data.message)
      } catch (error) {
        console.log('error :', error)
        this.error = error.response.data.error
      }
    },
    async createComment() {
      try {
        const response = await Comments.createComment({
          userId: this.id,
          postId: this.post.post.id,
          comment: this.answer
        })
        console.log(response.data.message)
        window.location.reload();
      } catch (error) {
        console.log('error :', error)
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    this.post = (await Posts.getPost(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))).data
    this.isFetched = true
    if (this.post.comments.length) {
      this.hasComments = true
    }
    else { this.hasComments = false}
  }
})
</script>

<style lang="scss" scoped>
  .comment-date {
    font-size: 10px;
  }
  .comment-content {
    line-height: normal;
  }
  .comment-none {
    color: $info
  }
  .del-btn, .create-btn{
    width: 20px;
    height: 20px;
  }
</style>
