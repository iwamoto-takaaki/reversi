<template lang="pug">
  #firebaseui-auth-container
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { authObject, ui } from '@/scripts/firebase'

export default defineComponent({
    setup(props, { root }) {
        const from = () => {
            if (root.$route.query.from) {
                return root.$route.query.from as string
            }
            return '/'
        }

        onMounted(() => {
            ui.start('#firebaseui-auth-container', {
                signInOptions: [authObject.EmailAuthProvider.PROVIDER_ID],
                signInSuccessUrl: from(),
            })
        })
    },
})
</script>