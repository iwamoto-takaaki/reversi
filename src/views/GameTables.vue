<template lang="pug">
  #gemetables
    h1 テーブル一覧
    P newGameId: {{ state.id }}
    form.new-game(@submit.prevent="createGameTable")
      input.newTitle(type="text" v-model="newTitle")
      input.submit(type="submit" value="登録")
    .tableList(v-for="game in games" :key="game.id")
      p(@click="gameClicked(game)") {{ game.title }}
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted, ref, toRef, onUnmounted } from '@vue/composition-api'
import { Listener } from '@/scripts/interfaces'
import getUser from '@/scripts/user'
import getGameTableListener, { GameTable } from '@/scripts/gameListener'

export default defineComponent ({
  setup(props, { root }) {
    const newTitle = ref<string>('Title')
    const state = reactive<{
      id: string,
    }> ({
      id: '',
    })
    const user = getUser()
    const gameListener = getGameTableListener(user)

    const lisners: Listener[] = [user, gameListener]
    onMounted(() => lisners.forEach((l) => l.subscribe()))
    onUnmounted(() => lisners.forEach((l) => l.unsubscribe()))

    const games = gameListener.data
    const userid = user.uid

    const createGameTable = async () => {
      if (!newTitle.value) { return }
      state.id = await gameListener.newRecord(newTitle.value)
      newTitle.value = ''
    }

    const moveGame = (id: string) => root.$router.push(`/game/${id}`)
    const gameClicked = (game: GameTable) => moveGame(game.id)

    return { newTitle, userid, state, games, createGameTable, gameClicked }
  },
})
</script>