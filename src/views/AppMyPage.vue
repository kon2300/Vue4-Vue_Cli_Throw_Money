<template>
  <div class="app-my-page">
    <div class="columns m-5 is-size-4">
      <p class="column"> {{ $store.getters.getUsername }} さん ようこそ！!</p>
      <p class="column has-text-right">残高: {{ $store.getters.getWallet }}</p>
      <p class="column has-text-right"><button class="button is-info" @click="onSignOut">ログアウト</button></p>
    </div>
    <div class="has-text-centered m-3">
      <h1 class="title h1">ユーザ一覧</h1>
      <table>
        <tr>
          <th>ユーザ名</th>
        </tr>
        <tbody></tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'AppMyPage',
  methods: {
    ...mapActions([
      'userSignOut',
      'userSignInCheck'
    ]),
    onSignOut() {
      this.userSignOut();
    }
  },
  created() {
    this.userSignInCheck();
  }
}
</script>

<style>

</style>