<template>
<div class="container">
    <div class="default-state step1">
        <div>
            <div>1</div>
            <div>購物車</div>
        </div>
        <div>
            <div>2</div>
            <div>填寫資料</div>
        </div>
        <div>
            <div>3</div>
            <div>訂單確認</div>
        </div>
        <div class="line"></div>
    </div>
    <div class="content">
        <div>

            <OrderList></OrderList>
        </div>
        <button @click="switchColor"></button>
    </div>
</div>
</template>

<script>
import OrderList from '@/components/OrderView/OrderList.vue';
import store from '@/store/store.js';
import {
    computed,
    onMounted,
    provide,
    ref
} from '@vue/runtime-core';

export default {
    setup() {

        onMounted(() => [
            document.body.classList.add('scroll')
        ])

        const user = computed(() => {
            return store.state.user
        })

        const step = ref(1)

        const switchColor = () => {

        }

        return {
            user,
            switchColor
        }
    },
    components: {
        OrderList,
    }
}
</script>

<style lang="scss" scoped>
$gray_default: rgba(200, 200, 200, 1);
$gray_active: rgba(100, 100, 100, 1);

.container {
    margin-top: 120px;
    height: 300vh;
}

.default-state {

    width: 1000px;
    max-width: 80vw;
    height: 100px;
    margin: 10px auto;
    color: black;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

    >div {
        display: flex;
        align-items: center;
        flex-direction: column;

        >div:nth-of-type(1) {
            height: 30px;
            width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: $gray_default;
            color: white;
            margin-bottom: 10px;
            position: relative;
        }
    }

}

.line {
    z-index: -1;
    position: absolute;
    width: 65%;
    height: 2px;
    transform: translateY(-15px);
    background-image: linear-gradient(90deg, $gray_active 0%, $gray_default 0%);
}

.step1 {
    >div:nth-of-type(1) {
        >div:nth-of-type(1) {
            background-color: $gray_active;
        }
    }
}

.step2 {

    >div:nth-of-type(1):hover {
        >div:nth-of-type(1) {
            background-color: $gray_active;
            cursor: pointer;
        }
    }

    >div:nth-of-type(2) {
        >div:nth-of-type(1) {
            background-color: $gray_active;

        }
    }

    .line {
        background-image: linear-gradient(90deg, $gray_active 50%, $gray_default 50%);
    }
}

.step3 {

    >div:nth-of-type(1):hover,
    div:nth-of-type(2):hover {
        >div:nth-of-type(1) {
            background-color: $gray_active;
            cursor: pointer;
        }
    }

    >div:nth-of-type(3) {
        >div:nth-of-type(1) {
            background-color: $gray_active;
        }
    }

    .line {
        background-image: linear-gradient(90deg, $gray_default 50%, $gray_active 50%);
    }
}

.content {
    width: 1400px;
    max-width: 100vw;
    padding: 10px 30px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .content {
        padding: 10px 10px;
    }
}
</style>
