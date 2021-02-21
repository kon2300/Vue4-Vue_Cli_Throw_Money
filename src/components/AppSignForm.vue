<template>
  <div class="app-sign-form">
    <div class="columns is-vcentered">
      <p class="column is-5 has-text-right">メールアドレス</p><input class=" column is-3 input" type="text" placeholder="E-mail" v-model="onChangeEmail">
    </div>
    <div class="columns is-vcentered">
      <p class="column is-5 has-text-right">パスワード</p><input class=" column is-3 input" type="text" placeholder="Password" v-model="onChangePassword">
    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'AppSignForm',
    computed: {
    ...mapGetters ([
      'getEmail',
      'getPassword'
    ]),
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
      'changeEmail',
      'changePassword'
    ]),
  }
}
</script>
