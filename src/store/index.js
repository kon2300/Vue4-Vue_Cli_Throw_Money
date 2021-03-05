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
    toggleNumber: null,
    watchWallet: false,
    giveWallet: false,
    sendMoney: 0,
    holdPassedUser: [],
    passedUser: []
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
    resetUserlist (state) {
      state.userlist = [];
    },
    filterUserlist (state) {
      state.userlist = state.userlist.filter(user => {
        return user.name !== state.username;
      })
    },
    watchToggleNumber (state, payload) {
      if(state.toggleNumber === payload) {
        state.toggleNumber = null;
      } else if(state.toggleNumber === payload) {
        state.toggleNumber = null;
      } else {
        state.toggleNumber = payload;
      }
    },
    changeWatchWallet (state) {
      state.watchWallet = !state.watchWallet;
    },
    changeGiveWallet (state) {
      state.giveWallet = !state.giveWallet;
    },
    resetWallet (state) {
      state.watchWallet = false;
      state.giveWallet = false;
    },
    changeSendMoney (state, payload) {
      state.sendMoney = payload;
    },
    selectPassedUser (state) {
      state.passedUser = state.userlist[state.toggleNumber];
    },
    resetSendMoney (state) {
      state.sendMoney = 0;
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
    getToggleNumber: state => state.toggleNumber,
    getWatchWallet: state => state.watchWallet,
    getGiveWallet: state => state.giveWallet,
    getSendMoney: state => state.sendMoney,
    getPassedUser: state => state.passedUser
  },
  actions: {
    // アカウントの作成
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
    // 登録済アカウントでのサインイン
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
    // 通貨の管理
    setWalletFirestore( { state, commit, dispatch } ) {
      firebase
      .firestore()
      .collection('users')
      .doc(state.uid)
      .set({
        name: state.username, 
        wallet: 2000,
        uid: state.uid
      })
      .then(() => {
        dispatch('getWalletFirestore');
      })
      .catch(error => {
        commit('setError', `※${ error.message }`);
      })
    },
    // 通貨の取得
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
    // アカウントのサインアウト
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
    // 登録済アカウントか否かのチェック
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
    // ユーザ一覧表示のためのデータ取得
    getUserlist( { commit }) {
      firebase
      .firestore()
      .collection('users')
      .get()
      .then((querySnapshot) => {
        commit('resetUserlist');
        querySnapshot.forEach((doc) => {
          commit('changeUserlist', doc.data());
        })
        commit('filterUserlist');
      })
      .catch(error => {
        commit('setError', `※${ error.message }`);
      })
    },
    // 通貨送金の処理
    async exchangeWalletFirestore( { state, commit, dispatch } ) {
      const passedWallet = firebase.firestore().collection('users').doc(state.passedUser.uid);
      const sendWallet = firebase.firestore().collection('users').doc(state.uid);
      try {
        await firebase.firestore().runTransaction(async transaction => {
          await transaction.update(passedWallet, { wallet: state.passedUser.wallet + state.sendMoney } );
          await transaction.update(sendWallet, {wallet: state.wallet - state.sendMoney} );
        })
        .then(() => {
        commit('resetSendMoney');
        dispatch('userSignInCheck');
        })
      }
      catch (error) {
        commit('setError', `※${ error.message }`);
      }
    },
    // // 通貨を受け取るための処理
    // passedWalletFirestore( { state, commit, dispatch } ) {
    //   firebase
    //   .firestore()
    //   .collection('users')
    //   .doc(state.passedUser.uid)
    //   .update({
    //     wallet: state.passedUser.wallet + state.sendMoney
    //   })
    //   .then(() => {
    //     dispatch('sendWalletFirestore');
    //   })
    //   .catch(error => {
    //     commit('setError', `※${ error.message }`);
    //   })
    // },
    // // 通貨を渡すための処理
    // sendWalletFirestore( { state, commit, dispatch } ) {
    //   firebase
    //   .firestore()
    //   .collection('users')
    //   .doc(state.uid)
    //   .update({
    //     wallet: state.wallet - state.sendMoney
    //   })
    //   .then(() => {
        
    //     dispatch('userSignInCheck');
    //   })
    //   .catch(error => {
    //     commit('setError', `※${ error.message }`);
    //   })
    // }
  },
  modules: {
  }
})
