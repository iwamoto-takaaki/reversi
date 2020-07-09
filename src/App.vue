<template lang="pug">
  #app
    #nav
      headerVue(:user="user")/
    router-view/
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, onUnmounted } from '@vue/composition-api';
import headerVue from '@/components/Header.vue';
import FirebaseUser from '@/scripts/user'

export default defineComponent({
  components: {
    headerVue,
  },
  setup() {
    const state = reactive<{
      user: FirebaseUser,
    }> ({
      user: new FirebaseUser()
    })

    onMounted(() => { state.user.subscribe() })
    onUnmounted(() => { state.user.unsubscribe() })

    return { ...state }
  },


})
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
