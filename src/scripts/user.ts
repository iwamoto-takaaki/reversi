import { Unsubscribe, User } from 'firebase'
import { auth } from '@/scripts/firebase'

export default class FirebaseUser {
    private detacher?: Unsubscribe
    private data?: User

    public subscribe() {
        this.detacher = auth.onAuthStateChanged((user) => {
            if (!!user) {
                this.data = user
            } else {
                this.data = undefined
            }
        })
    }

    public unsubscribe() {
        this.detacher && this.unsubscribe()
    }

    public get authrized(): boolean {
        return !!this.data
    }
};
