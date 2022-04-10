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
            <div class="image-section">
                <ImageSelector :id="ID" :url="URL"></ImageSelector>
            </div>

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

                <button @click="pushShopCar()" :disabled="pushing">加入購物車</button>
            </div>
        </div>
    </div>
    <!-- 下半部  -->
    <div class="product-description">
        <div class="switch">
            <button :class="{active: current_section === 'ProductDescription'}" @click="current_section = 'ProductDescription'">商品描述</button>
            <button :class="{active: current_section === 'ProductShipInfo'}" @click="current_section = 'ProductShipInfo'">送貨及付款方式</button>
            <hr>
            <component :is='current_section'></component>
        </div>

    </div>
</div>
</template>

<script>
import ImageSelector from '../components/ProductPage/ImageSelector.vue';
import ProductDescription from '../components/ProductPage/ProductDescription.vue';
import ProductShipInfo from '../components/ProductPage/ProductShipInfo.vue';

import ProductData from '../store/ProdcutData.js';

import {
    onMounted,
    ref,
    toRef,
    watch
} from "vue";

import {
    useRoute
} from 'vue-router';

import store from '../store/store.js'

export default {

    setup(prop) {

        //獲取params
        const ROUTE = useRoute();
        const ID = ref(ROUTE.params.id);

        const URL = ref(parseInt(ID.value) > 100 ? 'product_set' : 'product')

        const product_filted = ref(ProductData.filter((item) => {
            return item.id === parseInt(ID.value);
        })[0])

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

        const pushing = ref(false);

        const pushShopCar = () => {
            pushing.value = true;
            store.dispatch('pushShopCar', {
                id: product_filted.value.id,
                product_name: product_filted.value.product_name,
                price: product_filted.value.price,
                url: URL.value,
                count: order_number.value
            })
            setTimeout(() => {
                pushing.value = false;
            }, 1000);
        }

        //綁定navbar scroll class
        const BODY = document.body;

        onMounted(() => {
            BODY.classList.add("scroll");
        });

        //section select
        const current_section = ref('ProductDescription');

        //params偵測
        watch(ROUTE, (to, old) => {
            ID.value = to.params.id;
            URL.value = parseInt(ID.value) > 100 ? 'product_set' : 'product';
            product_filted.value = ProductData.filter((item) => {
                return item.id === parseInt(ID.value);
            })[0];
            order_number.value = 1;
            current_section.value = 'ProductDescription';
        })

        return {
            ID,
            URL,
            BODY,
            product_filted,
            order_number,
            pushing,
            current_section,

            checkOrderNumber,
            clickOrderNumber,
            pushShopCar
        }
    },
    components: {
        'ImageSelector': ImageSelector,
        'ProductDescription': ProductDescription,
        'ProductShipInfo': ProductShipInfo
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
        grid-template-columns: 1.2fr 1fr;
        padding: 10px 100px;
    }
}

.image-section {
    padding: 30px 0px;
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

    >button:disabled {
        pointer-events: none;
    }

}

.product-description {
    width: 100vw;
    // background-color: gray;
}

.switch {
    width: 1000px;
    max-width: 100vw;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    >button {
        position: relative;
        width: 50%;
        border-style: none;
        height: 40px;
        background-color: transparent;
        color: rgba(100, 100, 100, .5);
        font-size: 20px;
        cursor: pointer;
    }

    >button.active {
        color: rgba(100, 100, 100, .8);
    }

    >button::after {
        position: absolute;
        content: '';
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(100, 100, 100, .8);
        width: 0px;
        height: 3px;
        transition: 0.2s;
    }

    >button.active::after {
        width: 100px;
    }

    >button:nth-of-type(2).active::after {
        width: 160px;
    }

    >hr {
        width: 100%;
        margin-bottom: 30px;
    }

}

@media (max-width:1000px) {
    .product-container {
        margin-top: 60px;
    }

    .image-section {
        padding: 0;
    }

    .product-info {

        >div {
            place-content: center;
            grid-template-columns: 580px;
            padding: 10px 10px;
        }
    }

    .switch {
        width: 600px;
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

    .info-section {
        padding: 20px 0;
    }

    .image-section {
        padding: 0;
    }

    .switch {
        >button {
            font-size: 16px;
        }

        >button:nth-of-type(1).active::after {
            width: 80px;
        }

        >button:nth-of-type(2).active::after {
            width: 130px;
        }
    }
}
</style>
