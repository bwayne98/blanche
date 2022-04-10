<template>
<div class="order-list">
    <div class="order-title">
        <span> 購物車 <div>(</div> {{shop_car_total_count}} 件 <div>)</div></span>
    </div>

    <div class="sub-title">
        <div>商品資料</div>
        <div>優惠</div>
        <div>單品價格</div>
        <div>數量</div>
        <div>小計</div>
        <div></div>
    </div>

    <div class="item" v-for="(product,index) in shop_car" :key="product.id">
        <div>
            <img :src="require('../../../public/images/' +product.url + '/' + product.id + '.png')" alt="">
            <div>
                {{product.product_name}}
            </div>
        </div>
        <div>優惠資訊</div>
        <div>
            NT${{product.price}}
        </div>
        <div class="count">
            <div>
                <button @click="e=>changeCount(index, -1)" :disabled="counts[index] === 1 || update_state"> – </button>
                <input class="count-input" type="number" v-model="counts[index]" @change="changeCheck(index)" :disabled="update_state">
                <button @click="e=>changeCount(index, 1)" :disabled="update_state"> + </button>
            </div>

        </div>
        <div>
            NT${{product.price*product.count}}
        </div>
        <div>
            <button :disabled="!trash_state || update_state" @click="removeItem(product.id)"><i class="fa-solid fa-trash-can"></i></button>
        </div>

    </div>

</div>
</template>

<script>
import {
    reactive,
    ref,
    toRef
} from '@vue/reactivity'
import {
    computed,
    inject,
    onMounted,
    watch
} from '@vue/runtime-core'
import store from '@/store/store'
export default {
    setup(prop) {

        const shop_car = computed(() => {
            return store.state.shop_car;
        })

        const counts = ref(store.getters.shop_car_counts);

        watch(shop_car, (cur, old) => [
            counts.value = store.getters.shop_car_counts
        ])

        let timerID = null;

        const trash_state = ref(true);
        const update_state = ref(false);

        function updateVuex() {
            trash_state.value = false;
            clearTimeout(timerID);
            timerID = setTimeout(() => {
                update_state.value = true;

                for (let i = 0; i < shop_car.value.length; i++) {
                    store.dispatch('pushShopCar', {
                        id: shop_car.value[i].id,
                        count: counts.value[i] - shop_car.value[i].count
                    })
                }

                setTimeout(() => {
                    update_state.value = false;
                    trash_state.value = true;
                }, 300)

            }, 1000)
        }

        function removeItem(id) {
            trash_state.value = false;
            update_state.value = true;

            store.dispatch('removeShopCar', {
                id: id
            })
            setTimeout(() => {
                update_state.value = false;
                trash_state.value = true;
            }, 300)

        }

        const shop_car_total_count = computed(() => {
            return store.getters.shop_car_total_count
        })

        function changeCheck(index) {

            if (counts.value[index] === NaN || counts.value[index] < 1) {
                counts.value[index] = 1;
            } else {
                counts.value[index] = Math.floor(counts.value[index]);
            }
            updateVuex()
        }

        function changeCount(index, count) {
            counts.value[index] += count;
            updateVuex();
        }

        return {
            // product
            shop_car,
            removeItem,
            changeCheck,
            counts,
            changeCount,
            shop_car_total_count,
            update_state,
            trash_state
        }
    },
}
</script>

<style lang="scss" scoped>
$gray_default: rgba(200, 200, 200, 1);
$gray_active: rgba(100, 100, 100, 1);

.order-list {
    display: grid;
    grid-template-columns: 1fr;
    border-style: solid;
    border-width: 1px;
    border-color: $gray_default;

    >div:not(:nth-last-child(1)) {

        border-bottom-style: solid;
        border-width: 1px;
        border-color: $gray_default;
    }

}

.order-title {
    padding: 10px;
    text-align: start;
    font-size: 18px;
    line-height: 25px;
    font-weight: 600;
    background-color: rgb(240, 240, 240, );

    >span {
        display: flex;
        align-items: center;

        >div {
            transform: translateY(-2px);
            font-weight: 400;
            margin: 0 2px;
        }
    }

}

.item {
    text-align: start;
    width: 100%;

    >div:nth-of-type(1) {
        height: 100%;
        display: flex;
        place-self: start;

        img {
            height: 60px;
        }
    }

    >div:nth-last-of-type(1) {

        text-align: end;

        button {
            transform: translateX(-10px);
            border-style: none;
            color: $gray_default;
            cursor: pointer;
        }

        button:hover {
            color: $gray_active;
        }

        button:disabled {
            opacity: .5;
            pointer-events: none;
        }
    }
}

.item,
.sub-title {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    display: grid;
    grid-template-columns: 1.2fr 1fr .5fr 1fr .5fr .2fr;
    place-items: center;
    padding: 15px;
    row-gap: 5px;

    >div {
        width: 100%;
    }
}

.count {
    >div {
        display: grid;
        width: 100%;
        max-width: 150px;
        grid-template-columns: 30px 1fr 30px;
        margin: 0 auto;
        border-radius: 5px;
        border-style: solid;
        border-width: 1px;
        border-color: $gray_default;

        button {
            border-radius: 5px 0 0 5px;
            height: 30px;
            outline-style: none;
            border-style: none;
            cursor: pointer;
        }

        button:disabled {
            pointer-events: none;
        }

        button:nth-of-type(1) {
            border-radius: 5px 0 0 5px;
        }

        button:nth-of-type(2) {
            border-radius: 0 5px 5px 0;
        }

        input {
            min-width: 20px;
            outline-style: none;
            border-style: none;
            text-align: center;
            // pointer-events: none;
        }
    }
}

input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

@media (max-width: 768px) {
    .sub-title {
        display: none;
    }

    .item {
        grid-template-columns: 1.2fr 1fr .5fr;
        grid-template-rows: 30px 30px 30px;
        padding: 10px;

        >div:nth-of-type(1) {
            grid-row: 1 / 3;
            grid-column: 1 / 3;
        }

        >div:nth-of-type(2) {
            grid-row: 1 / 4;
            grid-column: 2 / 3;

        }

        >div:nth-of-type(4) {
            grid-row: 3 / 4;
            grid-column: 1 / 2;

        }

        >div:nth-of-type(6) {
            grid-row: 1 / 2;
            grid-column: 3 / 4;

        }
    }

    .count {
        >div {
            margin: 0 0;
        }

    }

}
</style>
