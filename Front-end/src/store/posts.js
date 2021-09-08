const state = {
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

const mutations = {

}

const actions = {

}

const getters = {
    posts: (state) => {
        return state.posts
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
