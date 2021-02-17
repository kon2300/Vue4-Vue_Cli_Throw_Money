import { createStore } from 'vuex'

export default createStore({
  state: {
    username: ''
  },
  mutations: {
    changeUsername (state, value) {
      return state.username = value;
    }
  },
  getters: {
    getUsername: state => state.username
  },
  actions: {
  },
  modules: {
  }
})
