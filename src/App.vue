<template>
<div class="app">
  <div id="nav" class="has-text-centered">
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
  <div class="has-text-centered has-text-danger">
    {{ $store.getters.getError }}
  </div>
</div>
<router-view></router-view>
</template>

<script>
export default {
}
</script>
