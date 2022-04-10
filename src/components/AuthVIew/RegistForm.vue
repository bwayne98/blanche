<template>
<div class="form">
    <p>註冊新的使用者</p>
    <p><span>{{err_meg}}</span></p>
    <div>
        <input type="text" placeholder="請輸入信箱" v-model="email">
        <input type="password" placeholder="請輸入密碼" v-model="password">
        <input type="password" placeholder="再次輸入密碼" v-model="confirm" :disabled="password === ''">
    </div>
    <button @click="clickRegistButton">註冊</button>
    <p><span @click="switchForm('LoginForm')">已經有帳號?立刻登入</span><span></span></p>
</div>
</template>

<script>
import {
    inject
} from '@vue/runtime-core'
export default {
    setup() {
        const email = inject('email');
        const password = inject('password');
        const confirm = inject('confirm');
        const err_meg = inject('err_meg');
        const clickRegistButton = inject('clickRegistButton');
        const switchForm = inject('switchForm')

        return {
            email,
            password,
            confirm,
            err_meg,
            clickRegistButton,
            switchForm
        }
    },
}
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        pointer-events: auto;
    }
}

.form {
    pointer-events: none;
    color: black;
    height: 300px;
    width: 300px;
    padding: 10px;
    box-shadow: gray 0 0 5px 0px;
    border-radius: 5px;
    opacity: 0;
    background-color: rgba(255, 255, 255, .2);
    animation: fadeIn .5s forwards .3s;

    p:nth-of-type(1) {
        font-size: 28px;
        font-weight: 600;
        margin: 10px 0 20px 0;
    }

    p:nth-of-type(2) {
        letter-spacing: 1px;
        transform: translateX(-2px);
        color: rgb(182, 45, 45);
        height: 20px;
        line-height: 20px;
        font-size: 14px;

        span:nth-of-type(2) {
            color: rgb(80, 144, 146)
        }
    }

    >div {
        width: 100%;
        height: 130px;

        input {
            border-style: none none solid none;
            border-width: 1px;
            outline-style: none;
            margin-top: 15px;
            padding: 0 5px;
            width: 100%;
            height: 20px;
            background-color: transparent;
        }
    }

    button {
        width: 100%;
        height: 30px;
        border-style: none;
        line-height: 20px;
        font-size: 14px;
        border-radius: 2px;
        color: white;
        background-color: gray;
        opacity: .8;
        cursor: pointer;
    }

    p:nth-of-type(3) {
        display: flex;
        justify-content: space-between;
        text-align: end;
        margin: 10px 5px;
        font-size: 14px;

        span {
            cursor: pointer;
        }
    }

}
</style>
