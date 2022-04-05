<template>
<div class="product">
    <div class="image">
        <img :src="require('../../public/images/' + url + '/' + id + '.png')" alt="">
        <router-link :to="{ name: 'product', params:{'id':id} }"></router-link>
        <button type="button" @click="pushShopCar" :disabled="clicked">加入購物車</button>
    </div>

    <h2>{{ product_name }}</h2>
    <p>NT${{ price }}</p>

    <button @click="pushShopCar" :disabled="clicked"><i class="fa-solid fa-cart-shopping"></i></button>

</div>
</template>

<script>
import {
    ref
} from '@vue/reactivity'

import store from '../store/store.js'

export default {
    props: ['url', 'id', 'product_name', 'price'],
    setup(prop) {

        const clicked = ref(false);

        const pushShopCar = () => {
            clicked.value = true;

            store.dispatch('pushShopCar', {
                url: prop.url,
                id: prop.id,
                product_name: prop.product_name,
                price: prop.price
            })
            setTimeout(() => {
                clicked.value = false;
            }, 500);

        }

        return {
            pushShopCar,
            clicked
        }

    },
}
</script>

<style lang="scss" scoped>
.product {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    >.image {
        position: relative;
        display: flex;
        justify-content: center;

        >img {
            width: 100%;
            z-index: -10;
        }
        
        >a {
            position: absolute;
            width: 100%;
            height: 100%;
            cursor: help;
        }

        >button {
            position: absolute;
            bottom: 5%;
            width: 90%;
            height: 15%;
            border-style: none;
            border-radius: 5px;
            display: none;
            transition: 0.5s;
            font-weight: 600;
            z-index: 20;
        }

        >button:disabled {
            opacity: 0.5;
        }
    }

    >h2 {
        width: 100%;
        background-color: white;
        font-size: 0.9em;
        font-weight: 600;
        padding: 10px;
        z-index: 20;
    }

    >p {
        width: 100%;
        background-color: white;
        font-weight: 600;
        padding-bottom: 5px;
        z-index: 20;
    }

    >button {
        margin: 20px 10px;
        height: 30px;
        border-style: none;
        border-radius: 3px;
        display: none;
        font-size: 1.1em;
        background-color: rgb(240, 240, 240);
        color: rgb(100, 100, 100);
        cursor: pointer;
    }

    >button:disabled {
        opacity: 0.5;
    }
}

.image:hover {
    >button {
        display: block;
        cursor: pointer;

    }

    >button:hover {
        background-color: rgb(80, 80, 80, 0.8);
        color: white;
    }

    >a {
        background-color: rgba(0, 0, 0, 0.6);
    }

}

@media (max-width: 800px) {
    .product {
        >button {
            display: block;
        }
    }

    .image:hover {
        >button {
            display: none;
            cursor: pointer;

        }

        >button:hover {
            background-color: transparent;
            color: unset;
        }

        >div {
            background-color: rgba(0, 0, 0, 0.6);
        }

    }

}
</style>
