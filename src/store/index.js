import { createStore } from 'vuex'
import firebase from '@/firebase.js'
import router from '@/router'

export default createStore({
  state: {
    username: '',
    email: '',
    password: '',
    error: null,
    uid: '',
    wallet: null
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
    },
    changeUid (state, payload) {
      state.uid = payload;
    },
    changeWallet (state, payload) {
      state.wallet = payload;
    }
  },
  getters: {
    getUsername: state => state.username,
    getEmail: state => state.email,
    getPassword: state => state.password,
    getUid: state => state.uid,
    getWallet: state => state.wallet
  },
  actions: {
    createUserAccount( { state, commit, dispatch } ) {
      firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: state.username,
          });
        commit('changeUid', res.user.uid)
        dispatch('setWalletFirestore')
      })
      .catch(error => {
        commit('setError', error.message);
        alert(state.error);
      })
    },
    userSignIn( { state, commit, dispatch } ) {
      firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((res) => {
        commit('changeUsername', res.user.displayName);
        commit('changeUid', res.user.uid);
        dispatch('getWalletFirestore');
      })
      .catch(error => {
        commit('setError', error.message);
        alert(state.error);
      })
    },
    setWalletFirestore( { state, commit, dispatch } ) {
      firebase
      .firestore()
      .collection('users')
      .doc(state.uid)
      .set({
        wallet: 2000
      })
      .then(() => {
        dispatch('getWalletFirestore');
      })
      .catch(error => {
        commit('setError', error.message);
        alert(state.error);
      })
    },
    getWalletFirestore( { state, commit } ) {
      firebase
      .firestore()
      .collection('users')
      .doc(state.uid)
      .get()
      .then((doc) => {
        router.push('/AppMyPage');
        commit('changeWallet', doc.data().wallet);
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
