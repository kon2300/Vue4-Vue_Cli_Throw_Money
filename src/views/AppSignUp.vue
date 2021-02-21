<template>
  <div class="app-sign-up">
    <h1 class="title is-2 has-text-centered m-5">新規登録画面</h1>
    <div class="columns is-vcentered">
      <p class="column is-5 has-text-right">ユーザー名</p><input class=" column is-3 input" type="text" placeholder="userName" v-model="onChangeUsername">
    </div>
    <div class="columns is-vcentered">
      <p class="column is-5 has-text-right">メールアドレス</p><input class=" column is-3 input" type="text" placeholder="E-mail" v-model="onChangeEmail">
    </div>
    <div class="columns is-vcentered">
      <p class="column is-5 has-text-right">パスワード</p><input class=" column is-3 input" type="text" placeholder="Password" v-model="onChangePassword">
    </div>
    <div>
      <p class="has-text-centered"><button class="button" @click="onCreateUserAccount()">新規登録</button></p>
      <p class="has-text-centered p-3"><router-link to=''>ログインはこちらから</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'AppSignUp',
  computed: {
    ...mapGetters ([
      'getUsername',
      'getEmail',
      'getPassword'
    ]),
    onChangeUsername: {
      get() {
        return this.getUsername;
      },
      set(value) {
        this.changeUsername(value);
      }
    },
    onChangeEmail: {
      get() {
        return this.getEmail;
      },
      set(value) {
        this.changeEmail(value);
      }
    },
    onChangePassword: {
      get() {
        return this.getPassword;
      },
      set(value) {
        this.changePassword(value);
      }
    }
  },
  methods: {
    ...mapMutations ([
      'changeUsername',
      'changeEmail',
      'changePassword'
    ]),
    ...mapActions ([
      'createUserAccount'
    ]),
    onCreateUserAccount() {
      this.createUserAccount();
    }
  }
}
</script>

<style>

</style>