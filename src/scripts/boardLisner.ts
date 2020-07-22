import { Ref, ref, computed, ComputedRef } from '@vue/composition-api'
import { Unsubscribe } from 'firebase'
import { db } from '@/scripts/firebase'

export type Piece = ' ' | '○' | '●'

export interface Cell {
    id: string,
    createdAt: Date,
    locate: number,
    piece: Piece,
}

export interface Board {
    cells: Ref<Cell[] | undefined>,
    subscribe: () => void,
    unsubscribe: () => void,
    setCell: (cell: Cell) => void,
    newGame: () => void,
    countBlack: ComputedRef<number>,
    countWhite: ComputedRef<number>,
}

const toBoard = (cells: Cell[]): Cell[] => {
    const ret = initBoard()
    const marge = (cell: Cell) => {
        const target = ret[cell.locate]
        if (!target) { return }
        target.id = cell.id
        target.piece = cell.piece
    }
    cells.map((c) => marge(c))

    return ret
}

const toCell = (id: string, data: any): Cell => {
    return {
        id,
        createdAt: new Date(data.createdAt),
        locate: data.locate,
        piece: data.piece,
    }
}

const toFirebaseObject = (cell: Cell) => {
    return {
        id: cell.id,
        createdAt: cell.createdAt.toISOString(),
        locate: cell.locate,
        piece: cell.piece,
    }
}

const initBoard = (): Cell[] => {
    const getPiece = (i: number) => {
        if (i === 3 * 8 + 3 || i === 4 * 8 + 4) { return '●' }
        if (i === 4 * 8 + 3 || i === 3 * 8 + 4) { return '○' }
        return ' '
    }

    const ret: Cell[] = []
    for (let i = 0; i < 8 * 8 ; ++i) {
        ret.push({
            id: '',
            locate: i,
            createdAt: new Date(),
            piece: getPiece(i),
        })
    }

    return ret
}

const getGame = (id: string): Board => {
    const cells = ref<Cell[] | undefined>(undefined)
    let detacher: Unsubscribe | undefined
    console.log(`set collection gemeID: ${id}`)
    const collectionRef = db.collection(`gametables/${id}/board/`)

    const subscribe = () => {
        detacher = collectionRef
            .orderBy('locate')
            .onSnapshot((snapshot) => {
                console.log(`got snapshot!! ${snapshot.docs.length}`)
                cells.value = toBoard(
                    snapshot.docs.map(
                        (doc) => toCell(doc.id, doc.data()),
                    ),
                 )
            })
    }

    const unsubscribe = () => { detacher && detacher() }

    const setCell = async (cell: Cell) => {
        if (cell.piece === ' ') {
            await collectionRef.doc(location.toString()).delete
        } else if (cell.id === '') {
            console.log(toFirebaseObject(cell))
            await collectionRef.add(toFirebaseObject(cell))
        } else {
            await collectionRef.doc(cell.id).update(toFirebaseObject(cell))
        }
    }

    const newGame = () => cells.value && (initBoard().map((c) => setCell(c)))

    const countPiece = (piece: Piece) => {
        if(!cells.value) { return 0 }
        return cells.value.filter(c => c.piece === piece).length
    }

    const countBlack = computed(() => countPiece('●'))
    const countWhite = computed(() => countPiece('○'))

    return { cells, subscribe, unsubscribe, setCell, newGame, countBlack, countWhite }
}

export default getGame
