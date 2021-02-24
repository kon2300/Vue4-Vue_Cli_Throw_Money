<template>
  <div class="app-sign-in">
    <h1 class="title is-2 has-text-centered m-5">ログイン画面</h1>
    <AppSignForm />
    <div class="m-5">
      <p class="has-text-centered"><button class="button" @click="onUserSignIn()">ログインする</button></p>
      <p class="has-text-centered p-3"><router-link to='/'>新規登録はこちらから</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'AppSignIn',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initialize();
    })
  },
  components: {
    'AppSignForm': require('@/components/AppSignForm.vue').default
  },
  methods: {
    ...mapActions ([
      'userSignIn'
    ]),
    onUserSignIn() {
      this.userSignIn();
    },
    initialize() {
      this.$store.commit('setError', '');
    }
  }
}
</script>

<style>

</style>