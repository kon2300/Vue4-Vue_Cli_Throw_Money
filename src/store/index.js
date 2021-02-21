import { createStore } from 'vuex'
import firebase from '@/firebase.js'
import router from '@/router'

export default createStore({
  state: {
    username: '',
    email: '',
    password: '',
    error: null
  },
  mutations: {
    changeUsername (state, value) {
      return state.username = value;
    },
    changeEmail (state, value) {
      return state.email = value;
    },
    changePassword (state, value) {
      return state.password = value;
    },
    setError (state, payload) {
      state.error = payload;
    }
  },
  getters: {
    getUsername: state => state.username,
    getEmail: state => state.email,
    getPassword: state => state.password
  },
  actions: {
    createUserAccount( { state, commit } ) {
      firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: state.username
          });
        router.push('/AppMyPage');
      })
      .catch(error => {
        commit('setError', error.message);
        alert(state.error);
      })
    },
    userSignIn( { state, commit } ) {
      firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((res) => {
        commit('changeUsername', res.user.displayName);
        router.push('/AppMyPage');
      })
      .catch(error => {
        commit('setError', error.message);
        alert(state.error);
      })
    }
  },
  modules: {
  }
})
