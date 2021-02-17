<template>
  <div class="app-sign-up">
    <h1 class="title is-2 has-text-centered m-5">新規登録画面</h1>
    <div class="columns is-vcentered">
      <p class="column is-5 has-text-right">ユーザー名</p><input class=" column is-3 input" type="text" placeholder="userName" v-model="onChangeUsername">
    </div>
    <div class="columns is-vcentered">
      <p class="column is-5 has-text-right">メールアドレス</p><input class=" column is-3 input" type="text" placeholder="E-mail" v-model="email">
    </div>
    <div class="columns is-vcentered">
      <p class="column is-5 has-text-right">パスワード</p><input class=" column is-3 input" type="text" placeholder="Password" v-model="password">
    </div>
    <div>
      <p class="has-text-centered"><button class="button" @click="createUserAccount">新規登録</button></p>
      <p class="has-text-centered p-3"><router-link to=''>ログインはこちらから</router-link></p>
    </div>
  </div>
</template>

<script>
import firebase from '@/firebase.js';
export default {
  name: 'AppSignUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    onChangeUsername: {
      get() {
        return this.$store.getters.getUsername;
      },
      set(value) {
        this.$store.commit('changeUsername', value);
      }
    }
  },
  methods: {
    createUserAccount() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/AppMyPage");
        })
        .catch(error => {
          alert("Error!", error.message);
        });
    }
  }
}
</script>

<style>

</style>