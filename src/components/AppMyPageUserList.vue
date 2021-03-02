<template>
  <div class="app-my-page-user-list">
    <div class="has-text-centered m-3">
      <h1 class="title h1">ユーザ一覧</h1>{{$store.state.isActive}}
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>ユーザ名</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in $store.getters.getUserlist" :key="user.id">
            <th class="is-size-4"> {{ user.name }} </th>
            <td class="has-text-right">
              <div class="dropdown is-up"  :class="{'is-active': $store.getters.getToggleNumber === index}">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu7" @click="watchWalletButton(index)">
                    <span>Walletを見る</span>
                  </button>
                </div>
                <div class="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item has-background-success">
                      <p class="has-text-centered">残高 : <strong> {{ user.wallet }} </strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td class="has-text-left"><button class="button is-primary">送る</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'AppMyPageUserList',
  methods: {
    ...mapMutations([
      'watchWallet'
    ]),
    watchWalletButton(index) {
      this.watchWallet(index)
    }
  }
}
</script>

<style>

</style>