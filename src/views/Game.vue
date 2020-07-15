<template lang="pug">
    #game
        h1 Reversi
        p hello {{ displayName }}
        .baord
            .cells(v-for="cell in cells" :key="cell.location")
                .blank-cell.cell(v-if="cell.color === 'blank'" @click="setPiece(cell.location, 'black')") 
                .black-cell.cell(v-else-if="cell.color === 'black'" @click="setPiece(cell.location, 'white')") ●
                .white-cell.cell(v-else @click="setPiece(cell.location, 'black')") ○
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
