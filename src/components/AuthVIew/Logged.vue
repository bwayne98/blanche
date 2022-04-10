<template>
<div class="form">
    <p>{{user}}</p>
    <p>登入狀態</p>
    <button @click="LogOut">登出</button>
    <router-link :to="{name:'home',hash: '#desert'}"><button>前往購物</button></router-link>

</div>
</template>

<script>
import {
  computed,
    inject
} from '@vue/runtime-core'
import store from '@/store/store'
export default {
    setup() {

        const LogOut = inject('LogOut')
        const user = computed(()=>{
            return store.state.user.email
        })

        return {
            LogOut,
            user
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
    display: flex;
    flex-direction: column;
    justify-content: center;

    p:nth-of-type(1) {
        font-size: 16px;
        font-weight: 600;
        margin: 10px 0;
    }

    p:nth-of-type(2) {
        letter-spacing: 1px;
        transform: translateX(-2px);
        color: rgb(80, 144, 146);
        line-height: 20px;
        font-size: 14px;
        padding: 20px 0;
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
        margin-bottom: 10px;
    }
}
</style>
