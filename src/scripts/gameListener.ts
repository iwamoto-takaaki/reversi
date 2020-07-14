import { Unsubscribe } from 'firebase'
import { db } from '@/scripts/firebase'
import { ref, Ref, watch } from '@vue/composition-api'
import { FirebaseUser } from '@/scripts/user'

export interface GameTable {
    id: string,
    createdAt: Date,
    title: string,
    owner: string,
    ownerId: string,
}

const toGameTable = (id: string, data: any): GameTable => {
    return {
        id,
        createdAt: new Date(data.createdAt),
        title: data.title,
        owner: data.owner,
        ownerId: data.ownerId,
    }
}

const toFirebaseObject = (game: GameTable): any => {
    return {
        id: game.id,
        createdAt: game.createdAt.toISOString,
        title: game.title,
        owner: game.owner,
        ownerId: game.ownerId,
    }
}

const newGameTable = (user: FirebaseUser, title: string): any => {
    return {
        id: '',
        createdAt: (new Date()).toISOString(),
        title,
        owner: user.displayName.value,
        ownerId: user.uid.value,
    }
}

export interface GameTableListener {
    data: Ref<GameTable[]>,
    subscribe: () => void,
    unsubscribe: () => void,
    newRecord: (title: string) => Promise<string>,
    remove: (game: GameTable) => void,
    update: (game: GameTable) => void,
}

const getGameTableListener = (user: FirebaseUser): GameTableListener => {
    const data = ref<GameTable[]>([])
    let detacher: Unsubscribe | undefined
    const refCollection = db.collection('gametables')

    const subscribe = () => {
        detacher =　refCollection
            .where('ownerId', '==', user.uid.value)
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                data.value = snapshot.docs.map((doc) => toGameTable(doc.id, doc.data()))
            })
    }
    const unsubscribe = () => detacher && detacher()

    watch([user.uid], () => {
        if (!user.unsubscribe) { return }
        unsubscribe()
        subscribe()
    } )

    const newRecord = async (title: string) => (await refCollection.add(newGameTable(user, title))).id
    const remove = async (game: GameTable) => await refCollection.doc(game.id).delete()
    const update = async (geme: GameTable) => await refCollection.doc(geme.id).update(toFirebaseObject(geme))

    return { data, subscribe, unsubscribe, newRecord, remove, update}
}

export default getGameTableListener;
