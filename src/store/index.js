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
    wallet: null,
    userlist: [],
    toggleNumber: null
  },
  mutations: {
    changeUsername (state, payload) {
      state.username = payload;
    },
    changeEmail (state, payload) {
      state.email = payload;
    },
    changePassword (state, payload) {
      state.password = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    changeUid (state, payload) {
      state.uid = payload;
    },
    changeWallet (state, payload) {
      state.wallet = payload;
    },
    changeUserlist (state, payload) {
      state.userlist.push(payload);
    },
    filterUserlist (state) {
      state.userlist = state.userlist.filter(user => {
        return user.name !== state.username;
      })
    },
    toggleIsActive (state, payload) {
      if(state.toggleNumber === payload) {
        state.toggleNumber = null;
      } else {
        state.toggleNumber = payload;
      }
    }
  },
  getters: {
    getUsername: state => state.username,
    getEmail: state => state.email,
    getPassword: state => state.password,
    getError: state => state.error,
    getUid: state => state.uid,
    getWallet: state => state.wallet,
    getUserlist: state => state.userlist,
    getToggleNumber: state => state.toggleNumber
  },
  actions: {
    createUserAccount( { state, commit, dispatch } ) {
      firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((res) => {
        res.user.updateProfile( { displayName: state.username } );
        commit('changeUid', res.user.uid);
        dispatch('setWalletFirestore');
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
        name: state.username, 
        wallet: 2000
      })
      .then(() => {
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
        commit('changeUsername', doc.data().name);
        commit('changeWallet', doc.data().wallet);
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
          dispatch('getUserlist');
        }
      })
    },
    getUserlist( { commit }) {
      firebase
      .firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commit('changeUserlist', doc.data());
        })
        commit('filterUserlist');
      })
      .catch(error => {
        commit('setError', `※${ error.message }`);
      })
    }
  },
  modules: {
  }
})
