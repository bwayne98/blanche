<template>
<Nav style="z-index:100"></Nav>

<router-view></router-view>

<footer>
    this is a info.
</footer>
</template>

<script>
import Nav from './components/Nav.vue'
import store from '@/store/store.js'

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from '@firebase/auth'
import {
    doc,
    getDoc,
    setDoc
} from '@firebase/firestore'

import db from './store/firestore'
import {
    provide,
    ref
} from 'vue'

export default {
    setup() {

        const auth = getAuth();
        const login_state = ref(false);

        onAuthStateChanged(auth, user => {

            if (user) {
                login_state.value = true;

                getDoc(doc(db, 'blanche', 'member', auth.currentUser.uid, 'shopcar'))
                    .then(res => {
                        if (res.data() === undefined || res.data().list === []) {
                            setDoc(doc(db, "blanche", "member", user.uid, "shopcar"),
                                store.state.shop_car,
                            ).catch(() => {
                                console.log("update fail");
                            });
                        } else {
                            let list = store.state.shop_car;
                            store.dispatch('updateShopCar', res.data().list).then(() => {
                                for (let item of list) {
                                    store.dispatch('pushShopCar', item);
                                }
                            }).then(() => {
                                store.dispatch('updateUser', {
                                    email: auth.currentUser.email,
                                    uid: auth.currentUser.uid
                                })
                            });

                        }
                    })
                    .catch(err => console.log(err))
            } else {
                login_state.value = false;
                store.dispatch('cleanShopCar')
            }
        })

        const LogOut = () => {
            signOut(auth).then(history.go(0));

        }

        provide('LogOut', LogOut)
        provide('login_state', login_state)

        return {}
    },
    components: {
        'Nav': Nav
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: rgb(100, 100, 100)
}

::-webkit-scrollbar {
    width: 0px;
}

html {
    overflow-x: hidden;
    scroll-behavior: smooth;
    // -webkit-overflow-scrolling: touch;

}

body {
    overflow-x: hidden;

}

nav,
footer {
    display: block;
}

footer {
    height: 50vh;
    background-color: transparent;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

input{
    -webkit-appearance: none;
}
</style>
