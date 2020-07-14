import { Unsubscribe, User } from 'firebase'
import { auth } from '@/scripts/firebase'
import { ref, Ref, toRef, ComputedRef, computed } from '@vue/composition-api'

export interface FirebaseUser {
    subscribe: () => void,
    unsubscribe: () => void,
    logout: () => void,
    authenticated: ComputedRef<boolean>,
    uid: ComputedRef<string>,
    displayName: ComputedRef<string>,
}

const getUser = (): FirebaseUser => {
    const data = ref<User | null> (null)
    let detacher: Unsubscribe | undefined

    const subscribe = () => {
        detacher = auth.onAuthStateChanged((user) => {
            data.value = user
        })
    }

    const logout = () => data.value = null

    const unsubscribe = () => detacher && detacher()

    const authenticated = computed(() => data.value !== null)
    const uid = computed(() => data.value?.uid || '')
    const displayName = computed(() => data.value?.displayName || '')

    return { subscribe, unsubscribe, logout, authenticated, uid, displayName }
}

export default getUser
