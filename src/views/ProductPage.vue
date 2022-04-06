<template>
<div class="product-container">
    <div class="top-link">
        <div>
            <router-link :to="{name:'home'}"><span @click="BODY.classList.remove('scroll')">首頁</span></router-link>
            <span>/</span>
            <router-link v-if="ID < 100" :to="{name:'home',hash:'#desert'}"><span @click="BODY.classList.remove('scroll')">甜點</span></router-link>
            <router-link v-else :to="{name:'home',hash:'#set'}"><span @click="BODY.classList.remove('scroll')">禮盒</span></router-link>
        </div>
    </div>

    <div class="product-info">
        <!-- 上半部  -->
        <div>
            <ImageSelector :id="ID" :url="URL"></ImageSelector>
            <div class="info-section">
                <h1>{{ product_filted.product_name }}</h1>
                <p>Lorem ipsum dolor sit amet.</p>
                <hr>
                <p>NT${{ product_filted.price }}</p>
                <p>數量</p>
                <div>
                    <button @click="clickOrderNumber(false)" :disabled="order_number <= 1"> – </button>
                    <input type="number" name="" id="" v-model="order_number" @blur="checkOrderNumber">
                    <button @click="clickOrderNumber(true)"> + </button>
                </div>

                <button @click="pushShopCar()">加入購物車</button>
            </div>
        </div>
        <!-- 下半部  -->
    </div>
    <div class="description">3</div>
</div>
</template>

<script>
import ImageSelector from '../components/ImageSelector.vue'

import {
    onMounted,
    ref,
    computed
} from "vue";

import {
    useRoute
} from 'vue-router';

import store from '../store/store.js'

export default {

    setup(prop) {

        //獲取params
        const ROUTE = useRoute();
        const ID = ROUTE.params.id;

        const URL = computed(() => {
            return ID > 100 ? 'product_set' : 'product'
        })

        //物品清單
        const products = [{
                id: 1,
                product_name: "Kiss me",
                price: 130,
            },
            {
                id: 2,
                product_name: "莓好時光",
                price: 1080,
            },
            {
                id: 3,
                product_name: "季節限定草莓千層",
                price: 230,
            },
            {
                id: 4,
                product_name: "季節草莓塔",
                price: 220,
            },
            {
                id: 5,
                product_name: "娜特莉",
                price: 130,
            },
            {
                id: 10001,
                product_name: "客製化禮盒",
                price: 1300,
            },
            {
                id: 10002,
                product_name: "白甜點常溫禮盒",
                price: 880,
            },
            {
                id: 10003,
                product_name: "月光 檸檬塔禮盒",
                price: 1280,
            },
            {
                id: 10004,
                product_name: "可麗露禮盒",
                price: 680,
            },
        ];

        const product_filted = products.filter((item) => {
            return item.id === parseInt(ID);
        })[0];

        // 加入購物車
        const order_number = ref(1);

        const checkOrderNumber = () => {
            if (order_number.value === NaN || order_number.value === "") {
                order_number.value = 1;
            } else if (order_number.value < 1) {
                order_number.value = 1
            } else {
                order_number.value = Math.floor(order_number.value)
            }
        }

        const clickOrderNumber = (boolean) => {
            order_number.value = boolean ? order_number.value + 1 : order_number.value - 1;
        }

        const pushShopCar = () => {
            store.dispatch('pushShopCar', {
                id: product_filted.id,
                product_name: product_filted.product_name,
                price: product_filted.price,
                url: URL,
                count: order_number.value
            })
        }

        //綁定navbar scroll class
        const BODY = document.body;

        onMounted(() => {
            BODY.classList.add("scroll");
        });

        return {
            ID,
            URL,
            BODY,
            product_filted,
            order_number,
            checkOrderNumber,
            clickOrderNumber,
            pushShopCar
        }
    },
    components: {
        'ImageSelector': ImageSelector
    }
};
</script>

<style lang="scss" scoped>
.product-container {
    width: 100vw;
    margin-top: 100px;
}

.top-link {
    width: 100%;
    background-color: rgba(220, 220, 220, .6);

    >div {
        width: 1400px;
        max-width: 100vw;
        margin: 0 auto;
        padding: 10px 0 10px 30px;
        display: flex;
        align-items: center;

        a {
            text-decoration: none;
        }

        span {
            font-size: 14px;
            font-weight: 400;
            color: rgba(150, 150, 150, 1);
            padding-right: 5px;
        }

        a:hover {
            span {
                color: rgba(50, 50, 50, 1);
            }
        }
    }
}

.product-info {
    width: 100%;
    // background-color: red;

    >div {
        margin: 0 auto;
        width: 1200px;
        max-width: 100vw;
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 10px 100px;
    }
}

.image-section {
    display: grid;
    column-gap: 20px;
    grid-template-columns: 72px 1fr;
    padding: 30px 10px;

    >div:nth-of-type(1) {
        position: relative;
        height: 332px;
        display: grid;
        row-gap: 5px;

        >button {
            border-style: none;
            background-color: rgba(200, 200, 200, .6);
            color: rgba(0, 0, 0, .5);
            height: 30px;
            cursor: pointer;
        }

        >button:hover {
            background-color: rgba(50, 50, 50, .6);
            color: white;
        }

        >button:disabled {
            pointer-events: none;
            opacity: 0.5;
        }

        >div {
            display: grid;
            grid-template-columns: 1fr;
            row-gap: 5px;
            padding: 2px;
            overflow: auto;

            >img {
                cursor: pointer;
                outline-width: 2px;
                width: 100%;
            }

            >img.selected {

                outline-style: solid;
                outline-color: rgba(150, 150, 150, 1);
            }
        }

    }

    >img {
        width: 100%;
    }
}

.share-bar {
    padding: 10px;
    text-align: start;
    grid-column: 1/3;
}

.info-section {
    padding: 30px 20px;
    text-align: start;

    h1 {
        padding-bottom: 20px;
    }

    hr {
        margin: 20px 0;
    }

    p:nth-of-type(2) {
        padding: 10px 0;
        font-size: 20px;
        font-weight: 600;
    }

    p:nth-of-type(3) {
        font-weight: 600;
        font-size: 14px;
        opacity: .5;
    }

    >div {
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        height: 35px;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(200, 200, 200, .8);
        border-radius: 3px;
        // place-items: center;

        button {
            border-style: none;
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
        }

        button:disabled {
            pointer-events: none;
        }

        button:nth-of-type(1) {
            padding: 0 0 5px 0;
        }

        input {
            border-style: none;
            outline-style: none;
            width: 100%;

            padding: 0 10px;
        }

        input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }

    >button {
        cursor: pointer;
        color: white;
        background-color: gray;
        font-weight: 600;
        font-size: 14px;
        border-style: solid;
        border-width: 1px;
        border-color: transparent;
        border-radius: 3px;
        width: 100%;
        width: 100%;
        height: 35px;
        margin-top: 15px;
    }

    >button:hover {
        color: gray;
        background-color: white;
        border-color: gray;
    }

}

@media (max-width:1000px) {
    .product-container {
        margin-top: 60px;
    }

    .product-info {

        >div {
            place-content: center;
            grid-template-columns: 600px;
            padding: 10px 10px;
        }
    }

}

@media (max-width:600px) {
    .top-link {
        display: none;
    }

    .product-info {
        >div {
            grid-template-columns: 1fr;
            padding: 10px 10px;
        }
    }

    .image-section {
        padding: 30px 0;

        >div:nth-of-type(1) {
            position: relative;
            height: 285px;
            overflow: scroll;

        }
    }
}

@media (max-width:400px) {
    .image-section {
        padding: 30px 0;
        grid-template-columns: 1fr;

        >div:nth-of-type(1) {
            display: none;
        }
    }

    .share-bar {
        grid-column: 1/2;
    }
}
</style>
