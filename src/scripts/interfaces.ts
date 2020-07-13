export interface Listener {
    subscribe: () => void;
    unsubscribe: () => void;
}
