<template lang="pug">
    #game
        h1 Reversi
        p hello {{ displayName }}
        .baord
            .cells(v-for="(cell, index) in state.cells" :key="index")
                .blank-cell.cell(v-if="cell.color === 'blank'" @click="setPiece(index, 'black')") 
                .black-cell.cell(v-else-if="cell.color === 'black'" @click="setPiece(index, 'white')") ●
                .white-cell.cell(v-else @click="setPiece(index, 'black')") ○
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, PropType } from '@vue/composition-api'
import getGame, { Cell } from '@/scripts/game'
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

        const gameLintener = getGame(root.$route.params.gemeTableId)
        const state = gameLintener.state

        onMounted(() => gameLintener.subscribe())
        onUnmounted(() => gameLintener.unsubscribe())

        const setPiece = (location: number, cell: Cell) => gameLintener.setPiece(location, cell)
        const newGame = () => gameLintener.newGame()

        const gameTableId = root.$route.params.gameTableId

        return { state, gameTableId, setPiece, displayName }
    },
})
</script>

<style lang="sass" scoped>
@import 'src/sass/style'

#game
    display: flex
    flex-direction: column
    align-items: center
    .baord
        margin-left: auto
        margin-right: auto
        display: grid
        grid-template-columns: 3rem 3rem 3rem 3rem 3rem 3rem 3rem 3rem
        .cell
            font-size: 3rem
            display: flex
            justify-content: center
            align-items: center
            height: 3rem
            border: 1.5px solid #888
</style>
