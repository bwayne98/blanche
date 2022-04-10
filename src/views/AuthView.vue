<template>
<div class="container">
    <div class="content">
        <component :is="form_name"></component>
    </div>

</div>
</template>

<script>
import {
    ref,
    provide,
    onMounted,
    inject,
    watch,
} from 'vue';

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";

import LoginForm from '@/components/AuthVIew/LoginForm.vue';
import RegistFormVue from '@/components/AuthVIew/RegistForm.vue';
import Logged from '@/components/AuthVIew/Logged.vue'

import db from '@/store/firestore';
import {
    useRouter
} from 'vue-router';

export default {
    setup() {
        const email = ref('');
        const password = ref('');
        const confirm = ref('');
        const err_meg = ref('');
        const succ_meg = ref('');
        const auth = getAuth();

        const form_name = ref('LoginForm');
        const login_state = inject('login_state');

        if (window.localStorage.getItem('isLogged') !== '' | login_state) {
            form_name.value = 'Logged'
        }

        // console.log(auth.currentUser);

        provide('email', email);
        provide('password', password);
        provide('confirm', confirm);
        provide('succ_meg', succ_meg);
        provide('err_meg', err_meg);

        //切換component

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
                    email.value = '';
                    password.value = '';
                    window.localStorage.setItem('isLogged',userCredential.user.email);
                    history.go(0);
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;

                    console.log(error.code, error.message);
                    password.value = '';
                    err_meg.value = `信箱或密碼錯誤`;
                })
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

        let moving = false;

        onMounted(() => {

            document.body.classList.remove('scroll')

            let element = document.querySelector('.content');
            let el_top = element.offsetTop;
            let el_left = element.offsetLeft;
            let el_h = element.offsetHeight;
            let el_w = element.offsetWidth;

            function MouseMove(event) {

                if (moving) return;
                moving = true;

                setTimeout(() => {
                    let rotateX = '0deg';
                    let rotateY = '0deg';
                    if (el_top + el_h / 2 - event.screenY > 0) {
                        let deg = Math.min(Math.floor((el_top + el_h / 2 - event.screenY) / (el_h / 2) * 5), 5)
                        rotateX = `${deg}deg`;
                    } else if ((el_top + el_h * 1 / 2) - event.screenY < 0) {
                        let deg = Math.min(Math.floor((event.screenY - (el_top + el_h * 1 / 2)) / (el_h / 2) * 5), 5)
                        rotateX = `-${deg}deg`;
                    }
                    if (el_left + el_w / 2 - event.screenX > 0) {
                        let deg = Math.min(Math.floor((el_left + el_w / 2 - event.screenX) / (el_w / 2) * 10), 5)
                        rotateY = `-${deg}deg`;
                    } else if ((el_left + el_w / 2) - event.screenX < 0) {
                        let deg = Math.min(Math.floor((event.screenX - (el_left + el_w / 2)) / (el_w / 2) * 10), 5)
                        rotateY = `${deg}deg`;
                    }
                    element.style.transform = `rotateX(${rotateX}) rotateY(${rotateY})`;
                    moving = false;
                }, 100)
            }

            window.addEventListener('mousemove', MouseMove.bind())
        })

        return {
            form_name
        }
    },
    components: {
        'LoginForm': LoginForm,
        'RegistForm': RegistFormVue,
        'Logged': Logged
    },
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    padding-top: 300px;
    height: 100vh;
    background-image: url('../../public/images/main.png');
    background-repeat: no-repeat;
    background-size: 100vw;
    background-position: top;
    background-attachment: fixed;
    perspective: 1000px;
}

.content {
    transition: .2s;
    // animation: shake 3s infinite linear;
}

@keyframes shake {

    0%,
    100% {
        transform: rotateY(10deg) rotateX(5deg);
    }

    50% {
        transform: rotateY(-10deg) rotateX(-5deg);
    }

}
</style>
