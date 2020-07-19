import { Unsubscribe } from 'firebase'
import { db } from '@/scripts/firebase'
import { ref, Ref, watch, computed } from '@vue/composition-api'
import { FirebaseUser } from '@/scripts/user'
import { GameTable, toGameTable, newGameTable, toFirebaseObject } from '@/scripts/game'

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
        console.log(`subscribe user: ${user.uid}`)
        detacher =　refCollection
            .where('ownerId', '==', user.uid)
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                data.value = snapshot.docs.map((doc) => toGameTable(doc.id, doc.data()))
            })
    }
    const unsubscribe = () => detacher && detacher()

    watch(computed(() => user.uid), () => {
        unsubscribe()
        subscribe()
    })

    const newRecord = async (title: string) => (await refCollection.add(newGameTable(user, title))).id
    const remove = async (game: GameTable) => await refCollection.doc(game.id).delete()
    const update = async (geme: GameTable) => await refCollection.doc(geme.id).update(toFirebaseObject(geme))

    return { data, subscribe, unsubscribe, newRecord, remove, update }
}

export default getGameTableListener;
