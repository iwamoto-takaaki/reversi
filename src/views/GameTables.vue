<template lang="pug">
  #gemetables
    h1 テーブル一覧
    p userId: {{ userid }} name: {{ name }}
    P newGameId: {{ state.id }}
    form.new-game(@submit.prevent="createGameTable")
      input.newTitle(type="text" v-model="newTitle")
      input.submit(type="submit" value="登録")
    .tableList(v-for="game in games" :key="game.id")
      p(@click="gameClicked(game)") {{ game.title }}
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted, ref, toRef, onUnmounted, PropType } from '@vue/composition-api'
import { Listener } from '@/scripts/interfaces'
import { FirebaseUser } from '@/scripts/user'
import getGameTableListener from '@/scripts/gameListener'
import { GameTable } from '@/scripts/game'

export default defineComponent ({
    props: {
      user: {
          type: Object as PropType<FirebaseUser>,
          required: true,
      },
  },
  setup(props, { root }) {
    const newTitle = ref<string>('Title')
    const state = reactive<{
      id: string,
    }> ({
      id: '',
    })
    const gameListener = getGameTableListener(props.user)

    onMounted(() => gameListener.subscribe())
    onUnmounted(() => gameListener.unsubscribe())

    const games = gameListener.data
    const userid = computed(() => props.user.uid)
    const name = computed(() => props.user.displayName)

    const createGameTable = async () => {
      if (!newTitle.value) { return }
      state.id = await gameListener.newRecord(newTitle.value)
      newTitle.value = ''
    }

    const moveGame = (id: string) => root.$router.push(`/game/${id}`)
    const gameClicked = (game: GameTable) => moveGame(game.id)

    return { newTitle, userid, name, state, games, createGameTable, gameClicked }
  },
})
</script>