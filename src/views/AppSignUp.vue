<template>
  <div class="app-sign-up">
    <h1 class="title is-2 has-text-centered m-5">新規登録画面</h1>
    <div class="columns is-vcentered">
      <p class="column is-5 has-text-right">ユーザー名</p><input class=" column is-3 input" type="text" placeholder="userName" v-model="onChangeUsername">
    </div>
    <AppSignForm />
    <div class="m-5">
      <p class="has-text-centered"><button class="button" @click="onCreateUserAccount()">新規登録する</button></p>
      <p class="has-text-centered p-3"><router-link to='AppSignIn'>ログインはこちらから</router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'AppSignUp',
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initialize();
    })
  },
  components: {
    'AppSignForm': require('@/components/AppSignForm.vue').default
  },
  computed: {
    ...mapGetters ([
      'getUsername'
    ]),
    onChangeUsername: {
      get() {
        return this.getUsername;
      },
      set(value) {
        this.changeUsername(value);
      }
    }
  },
  methods: {
    ...mapMutations ([
      'changeUsername'
    ]),
    ...mapActions ([
      'createUserAccount'
    ]),
    onCreateUserAccount() {
      this.createUserAccount();
    },
    initialize() {
      this.$store.commit('setError', '');
    }
  }
}
</script>

<style>

</style>