<template lang="pug">
    #game
        h1 Reversi
        p hello {{ displayName }}
        .baord
            .cells(v-for="cell in cells" :key="cell.locate")
                .blank-cell.cell(@click="clickedPiece(cell)") {{ cell.piece }}  
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, PropType } from '@vue/composition-api'
import { Listener } from '@/scripts/interfaces'
import getGame, { getGameTableListener } from '@/scripts/gameListener'
import getBoard, { Cell } from '@/scripts/boardLisner'
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

        const gameLintener = getGameTableListener(root.$route.params.gameTableId)
        const boardListener =  getBoard(root.$route.params.gameTableId)

        const cells = ref(boardListener.cells)

        const listeners: Listener[] = [gameLintener, boardListener]
        onMounted(() => listeners.map((l) => l.subscribe()))
        onUnmounted(() => listeners.map((l) => l.unsubscribe()))

        const setPiece = (cell: Cell) => boardListener.setCell(cell)
        const newGame = () => boardListener.newGame()

        const gameTableId = root.$route.params.gameTableId

        const clickedPiece = (cell: Cell) => {
            if (cell.piece === ' ' || cell.piece === '●' ) {
                cell.piece = '○'
            } else {
                cell.piece = '●'
            }
            setPiece(cell)
        }

        return { cells, gameTableId, clickedPiece, displayName }
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
