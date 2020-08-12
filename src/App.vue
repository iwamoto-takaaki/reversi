<template lang="pug">
#app
  #nav
    headerVue(:user="user")/
  router-view(:user="user")/
</template>

<script lang="ts">
import { onMounted, reactive, onUnmounted } from 'vue'
import headerVue from '@/components/Header.vue'
import getUser from '@/scripts/user'

export default {
  name: 'App',
  components: {
    headerVue,
  },
  setup() {
    const user = getUser()

    onMounted(() => user.subscribe())
    onUnmounted(() => user.unsubscribe())

    return { user }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
