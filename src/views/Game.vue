<template lang="pug">
    #game
        h1 Reversi
        p helle {{ displayName }}
        .baord
            .cells(v-for="cell in cells" :key="cell.location")
                .blank-cell.cell(v-if="cell.color === 'blank'" @click="setPiece(cell.location, 'black')") " " 
                .black-cell.cell(v-else-if="cell.color === 'black'" @click="setPiece(cell.location, 'white')") black
                .white-cell.cell(v-else @click="setPiece(cell.location, 'black')") white
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, PropType } from '@vue/composition-api'
import getGame, { Color } from '@/scripts/game'
import { FirebaseUser } from '@/scripts/user'

export default defineComponent({
    props: {
        user: {
            type: Object as PropType<FirebaseUser>,
            required: true,
        },
    },
    setup(prop, { root }) {
        const displayName = prop.user.displayName

        const myColor = ref<Color>('black')
        const game = getGame(root.$route.params.gemeTableId)
        const cells = game.data

        onMounted(() => game.subscribe())
        onUnmounted(() => game.unsubscribe())

        const setPiece = (location: number, color: Color) => game.setPiece(location, color)
        const newGame = () => game.newGame()

        const gameTableId = root.$route.params.gameTableId

        return { cells, gameTableId, setPiece, displayName }
    },
})
</script>