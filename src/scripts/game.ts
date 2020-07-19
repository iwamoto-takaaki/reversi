import { Ref, ref } from '@vue/composition-api'
import { Unsubscribe } from 'firebase'
import { db, functions } from '@/scripts/firebase'
import {  } from '@/scripts/gameListener'
import { FirebaseUser } from '@/scripts/user'

export type Cell = ' ' | '○' | '●'

export interface GameTable {
    id: string,
    createdAt: Date,
    title: string,
    owner: string,
    ownerId: string,
    board: Cell[],
}

export const toGameTable = (id: string, data: any): GameTable => {
    return {
        id,
        createdAt: new Date(data.createdAt),
        title: data.title,
        owner: data.owner,
        ownerId: data.ownerId,
        board: toBoard(data.bord),
    }
}

const toBoard = (data: any): Cell[] => {
    if (!data) { return initBoard() }
    if (!Array.isArray(data)) { return initBoard() }
    if (data.length < 8 * 8)  { return initBoard() }
    return data.map((c) => c === '○' || c === '●' ? c : ' ')
}

const initBoard = (): Cell[] => {
    const ret: Cell[] = []
    for (let i = 0; i < 8 * 8 ; ++i) {
        if (i === 3 * 8 + 3 || i === 4 * 8 + 4) {
            ret.push('●')
        } else if (i === 4 * 8 + 3 || i === 3 * 8 + 4) {
            ret.push('○')
        } else {
            ret.push(' ')
        }
    }

    return ret
}

export const toFirebaseObject = (game: GameTable): any => {
    return {
        id: game.id,
        createdAt: game.createdAt.toISOString,
        title: game.title,
        owner: game.owner,
        ownerId: game.ownerId,
        board: game.board,
    }
}

export const newGameTable = (user: FirebaseUser, title: string): any => {
    return {
        id: '',
        createdAt: (new Date()).toISOString(),
        title,
        owner: user.displayName,
        ownerId: user.uid,
        bord: initBoard(),
    }
}

export interface GameLisner {
    state: Ref<GameTable | undefined>,
    subscribe: () => void,
    unsubscribe: () => void,
    setPiece: (location: number, cell: Cell) => void,
    newGame: () => void,
}

const getGame = (id: string): GameLisner => {
    const state = ref<GameTable | undefined>(undefined)
    let detacher: Unsubscribe | undefined
    const doc = db.doc(`gametables/${id}`)

    const subscribe = () => {
        detacher = doc.onSnapshot((snapshot) => { state.value = toGameTable(snapshot.id, snapshot.data()) })
    }
    const unsubscribe = () => { detacher && detacher() }

    const setter = functions.httpsCallable('setGameCell')
    const setPiece = async (location: number, cell: Cell) => {
        return setter.call({ location, cell })
    }

    const newGame = () => state.value && (state.value.board = initBoard())

    return { state, subscribe, unsubscribe, setPiece, newGame }
}

export default getGame
