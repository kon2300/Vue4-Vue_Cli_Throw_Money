<template>
  <div class="app-my-page-user-list">
    <div class="has-text-centered m-3">
      <h1 class="title h1"> ユーザ一覧 </h1>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th> ユーザ名 </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in $store.getters.getUserlist" :key="user.id">
            <th class="is-size-4"> {{ user.name }} </th>
            <td>
              <button class="button" @click="watchWalletButton(index)"> Walletを見る </button>
              <div class="modal" :class="{'is-active': $store.getters.getToggleNumber === index && $store.getters.getWatchWallet === true }">
                <div class="modal-background"></div>
                <div class="modal-content">
                  <div class="box">
                    <p class="has-text-centered"> {{ user.name }} さんの残高 : <strong> {{ user.wallet }} </strong></p>
                    <button class="modal-close is-large" aria-label="close" @click="watchWalletButton(index)"></button>
                  </div>
                </div>                    
              </div>                    
            </td>
            <td>
              <button class="button" @click="toggleModalButton(index)"> 送る </button>
              <div class="modal" :class="{'is-active': $store.getters.getToggleNumber === index && $store.getters.getGiveWallet === true}">
                <div class="modal-background"></div>
                <div class="modal-content">
                  <div class="box">
                    <p class="has-text-centered"> あなたの残高: <strong> {{ $store.getters.getWallet }} </strong></p>
                    <p class="has-text-centered"> 送る金額 </p>
                    <form @submit.prevent>
                      <input class="input" type="number" step="100" min="100" onkeydown="return event.keyCode !== 69" :max="$store.getters.getWallet" v-model.number="sendMoney" required="true">
                      <p class="has-text-centerted has-text-danger"> {{$store.getters.getError}} </p>
                      <p class="has-text-right"> {{ user.name }} さんに <button class="button is-danger" @click="sendMoneyButton()"> 送る </button></p>
                    </form>
                  </div>
                  <button class="modal-close is-large" aria-label="close" @click="toggleModalButton(index)"></button>
                </div>
              </div>                    
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'AppMyPageUserList',
  computed: {
    ...mapGetters([
      'getSendMoney',
      'getWallet'
    ]),
    sendMoney: {
      get() {
        return this.getSendMoney;
      },
      set(value) {
        if(this.getSendMoney < this.getWallet) {
          this.setError('');
          this.changeSendMoney(value);
        } else {
          this.setError('自身の残高より低く設定してください');
          this.changeSendMoney('');
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'exchangeWalletFirestore'
    ]),
    ...mapMutations([
      'changeWatchWallet',
      'changeGiveWallet',
      'watchToggleNumber',
      'resetWallet',
      'changeSendMoney',
      'setError',
      'selectPassedUser'
    ]),
    watchWalletButton(index) {
      this.resetWallet();
      this.changeWatchWallet();
      this.watchToggleNumber(index);
      this.selectPassedUser();
    },
    toggleModalButton(index) {
      this.resetWallet();
      this.changeGiveWallet();
      this.watchToggleNumber(index);
      this.setError();
      this.selectPassedUser();
    },
    sendMoneyButton() {
      this.exchangeWalletFirestore();
    }
  }
}
</script>

<style>

</style>
