import { createStore } from 'vuex'
import firebase from '@/firebase.js'
import router from '@/router'

export default createStore({
  state: {
    username: '',
    email: '',
    password: '',
    error: '',
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
    getError: state => state.error,
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
        commit('setError', '');
        dispatch('setWalletFirestore')
      })
      .catch(error => {
        commit('setError', `※${ error.message }`);
      })
    },
    userSignIn( { state, commit, dispatch } ) {
      firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then((res) => {
        commit('changeUsername', res.user.displayName);
        commit('changeUid', res.user.uid);
        commit('setError', '');
        dispatch('getWalletFirestore');
      })
      .catch(error => {
        commit('setError', `※${ error.message }`);
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
        commit('setError', '');
        dispatch('getWalletFirestore');
      })
      .catch(error => {
        commit('setError', `※${ error.message }`);
      })
    },
    getWalletFirestore( { state, commit } ) {
      firebase
      .firestore()
      .collection('users')
      .doc(state.uid)
      .get()
      .then((doc) => {
        commit('changeWallet', doc.data().wallet);
        commit('setError', '');
        router.push('/AppMyPage');
      })
      .catch(error => {
        commit('setError', `※${ error.message }`);
      })
    },
    userSignOut( { commit } ) {
      firebase
      .auth()
      .signOut()
      .then(()=>{
        router.push('/AppSignIn');
      })
      .catch( (error)=>{
        commit('setError', `※${ error.message }`);
      })
    },
    userSignInCheck( { commit, dispatch } ) {
      firebase
      .auth()
      .onAuthStateChanged(user => {
        if (!user) {
          router.push('/AppSignIn');
        } else {
          commit('changeUsername', user.displayName);
          commit('changeUid', user.uid);
          dispatch('getWalletFirestore');  
        }
      })
    }
  },
  modules: {
  }
})
