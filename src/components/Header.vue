<template lang="pug">
    #header-section
        .title
            h1 REVERSI
        .nav
            .links
                router-link(to="/") Home1
                router-link(to="/about") About
                router-link(to="/gametables" v-if="authenticated") Reversi
            .login
                .signin-btn(v-if="!authenticated")
                    router-link.button(to="/auth") Sign In
                .signout(v-else)
                    .singout-btn.button(@click="logout") Sign out
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted, watch, PropType } from '@vue/composition-api'
import getUser, { FirebaseUser } from '@/scripts/user'

export default defineComponent ({
    props: {
        user: {
            type: Object as PropType<FirebaseUser>,
            required: true,
        },
    },
    setup(props) {
        const authenticated = computed(() => props.user.authenticated)
        const logout = props.user.logout

        return { authenticated, logout}
    },
})
</script>

<style lang="sass" scoped>
@import 'src/sass/style'

#header-section
    .title
        background-color: #111
        color: #bbb
        padding: 1rem

        h1
            display: inline
    .nav
        display: grid
        grid-template-areas: "right center left"
        grid-template-columns: 2fr 5fr 2fr
        background-color: #555
        padding: 1rem 1rem
        color: #59BD7C

        a
            padding: .5rem 1rem
            color: inherit
            font-weight: bold

            &.router-link-exact-active 
                color: #42b983

        .links
            grid-area: center
            margin-left: auto;
            margin-right: auto;
            display: flex;
            align-items: center;

        .login
            grid-area: left

            .signin-btn, .signout
                display: flex
                flex-derection: row

            .button
                margin-left: auto
                padding: .5rem 1rem
                border: 1px solid
                border-color: $green
                border-radius: .3rem
                color: $green
</style>