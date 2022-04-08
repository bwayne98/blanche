<template>
<div class="container">
    <component :is="form_name"></component>

</div>
</template>

<script>
import {
    ref,
    provide
} from 'vue';

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";

import LoginForm from '@/components/LoginForm.vue';
import RegistFormVue from '@/components/RegistForm.vue';

import db from '@/store/firestore';

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const confirm = ref('');
        const err_meg = ref('');
        const succ_meg = ref('');
        const auth = getAuth();

        // console.log(auth.currentUser);

        provide('email', email);
        provide('password', password);
        provide('confirm', confirm);
        provide('succ_meg', succ_meg);
        provide('err_meg', err_meg);

        //切換component
        const form_name = ref('LoginForm');
        const switchForm = (component) => {
            email.value = '';
            password.value = '';
            err_meg.value = '';
            succ_meg.value = '';

            form_name.value = component;
        }

        const clickLoginButton = () => {

            err_meg.value = '';
            succ_meg.value = '';

            signInWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    console.log(userCredential);
                    email.value = '';
                    password.value = '';

                    // getDoc(doc(db, 'blanche', 'member', auth.currentUser.uid, 'shopcar'))
                    //     .then(res => {
                    //         store.dispatch('updateShopCarFromFireBase', res.data().list)
                    //     }).catch(err => console.log(err))

                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;

                    console.log(error.code, error.message);
                    password.value = '';
                    err_meg.value = `信箱或密碼錯誤`;
                });
        }

        provide('clickLoginButton', clickLoginButton);

        const clickRegistButton = () => {

            err_meg.value = '';
            succ_meg.value = '';

            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    console.log(userCredential);
                    email.value = '';
                    password.value = '';

                    signOut(auth).then(res => {
                        switchForm('LoginForm');

                        succ_meg.value = `註冊成功，請重新登入`
                        console.log(auth.currentUser);
                    });

                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;

                    console.log(error.code, error.message);
                    password.value = '';
                    confirm.value = '';
                    err_meg.value = `不可使用的信箱或密碼`;
                });
        }

        provide('clickRegistButton', clickRegistButton);

        provide('switchForm', switchForm)

        return {
            form_name
        }
    },
    components: {
        'LoginForm': LoginForm,
        'RegistForm': RegistFormVue
    },
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    // align-items: center;
    padding-top: 300px;
    height: 100vh;
    background-image: url('../../public/images/main.png');
    background-repeat: no-repeat;
    background-size: 100vw;
    background-position: top;
    background-attachment: fixed;
}
</style>
