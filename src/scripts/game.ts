import { Ref, ref } from '@vue/composition-api'

export type Color = 'blank' | 'black' | 'white'

export interface Cell {
    location: number,
    color: Color,
}

export interface Game {
    data: Ref<Cell[]>,
    subscribe: () => void,
    unsubscribe: () => void,
    setPiece: (location: number, color: Color) => void,
    newGame: () => void,
}

const initCells = (): Cell[] => {
    const ret: Cell[] = []
    for (let i = 0; i < 8 * 8 ; ++i) {
        ret.push({location: i, color: 'blank'})
    }
    return ret
}

const getGame = (id: string): Game => {
    const data = ref(initCells())

    const subscribe = () => { console.log('subscribe') }
    const unsubscribe = () => { console.log('unsubscribe') }

    const setPiece = (location: number, color: Color) => {
        const target = data.value.find((cell) => cell.location === location)
        if (!target) { return }
        target.color = color
    }

    const newGame = () => data.value = initCells()

    return { data, subscribe, unsubscribe, setPiece, newGame }
}

export default getGame
