<template>
<div class="navbar" id="navbar">
    <div class="container">
        <div class="icons">

            <i class="fa-solid fa-magnifying-glass search" @click="(e)=>clickSearch(e)" :class="{active : search_bar}">
                <div class="small-search">
                    <input type="text" placeholder="找商品" v-model="search_input">
                    <div>
                        <div v-for="item in search_result" :key="item.id" @click="clickLink(item.id)">
                            {{ item.product_name }}
                        </div>
                    </div>
                </div>
                <div class="large-search" @click.prevent.stop>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <div>
                        <input type="text" placeholder="找商品" v-model="search_input">
                        <div>
                            <div v-for="item in search_result" :key="item.id" @click="clickLink(item.id)">
                                {{ item.product_name }}
                            </div>
                        </div>

                    </div>
                </div>

                <div class="dark-bg"></div>
            </i>
            <i class="fa-solid fa-comment"></i>
            <i class="fa-solid fa-user"></i>
            <i class="fa-solid fa-bag-shopping shop-car" @click="e => showShopCar(e)" :class="{active: shop_car}">
                <div class="shop-count" v-show="shop_car_number !== 0">
                    <div>
                        <div>{{shop_car_number}}</div>
                    </div>

                </div>
                <div class="shop-content" @click.prevent.stop>
                    <div v-if="shop_car_number === 0" style="margin-top:50vh"> 空的購物車 </div>
                    <div class="car-list">
                        <div v-for="product in shop_car_content" :key="product.id">
                            <img :src="require('../../public/images/' + product.url + '/' + product.id + '.png')" alt="" @click="clickLink(product.id)">
                            <div>
                                <p>{{ product.product_name }}</p>
                                <p> <span> {{ product.count }} <span>x</span> NT${{ product.price }} </span> <span> <i @click="removeShopCar(product.id)" class="fa-solid fa-trash-can"></i></span></p>
                            </div>
                            <hr>
                        </div>
                    </div>

                    <button v-show="shop_car_number !== 0" type="button"> <span> 前往結帳 ( NT${{ shop_car_price }} ) </span></button>

                </div>
                <div class="dark-bg"></div>
            </i>
            <i class="fa-solid fa-bars sidebar-controller" @click="(e)=>showSide(e)"></i>
        </div>
        <router-link :to="{name:'home'}" @click="BODY.classList.remove('scroll')"><img src="https://img.shoplineapp.com/media/image_clips/6177d14056a0c000203d646c/original.png?1635242304" alt="Logo"></router-link>
        <div class="top-arrow" @click="topArrow">
            <i class="fa-solid fa-arrow-up"></i>
        </div>
        <div id="menus" :class="{active : side_bar}" style="">

            <ul class="main-list">
                <li>
                    <div>
                        <div>
                            <router-link :to="{name:'home', hash:'#desert'}"> 甜點 </router-link>
                        </div> <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul class="sub-list">
                        <li>
                            <div> 現場專區 </div>
                        </li>
                        <li>
                            <div> 草莓季 </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div>
                        <div>
                            <router-link :to="{name:'home', hash:'#set'}"> 禮盒 </router-link>
                        </div> <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul class="sub-list">
                        <li>
                            <div> 常溫宅配專區 </div>
                        </li>
                        <li>
                            <div> 冷凍宅配專區 </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div> 客製化蛋糕 </div>
                </li>

                <li>
                    <div> 關於我們 </div>
                </li>
                <li>
                    <div> 聯絡我們 </div>
                </li>
                <li>
                    <div> 銷售據點 </div>
                </li>
            </ul>
            <hr>
            <ul class="main-list">
                <li>
                    <div>
                        <div>
                            <router-link :to="{name:'home', hash:'#desert'}"> 甜點 </router-link>
                        </div> <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul class="sub-list">
                        <li>
                            <div> 現場專區 </div>
                        </li>
                        <li>
                            <div> 草莓季 </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div>
                        <div>
                            <router-link :to="{name:'home', hash:'#set'}"> 禮盒 </router-link>
                        </div> <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <ul class="sub-list">
                        <li>
                            <div> 常溫宅配專區 </div>
                        </li>
                        <li>
                            <div> 冷凍宅配專區 </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div> 客製化蛋糕 </div>
                </li>

                <li>
                    <div> 關於我們 </div>
                </li>
                <li>
                    <div> 聯絡我們 </div>
                </li>
                <li>
                    <div> 銷售據點 </div>
                </li>
            </ul>
            <div class="dark-bg" @click="(e)=>showSide(e)"></div>
        </div>

    </div>

</div>
</template>

<script>
import {
    ref,
    computed,
    watch
} from 'vue';

import store from '../store/store.js'
import ProductData from '../store/ProdcutData.js';

import {
    useRouter
} from 'vue-router'

export default {

    setup() {

       //search bar control
        const search_bar = ref(false);
        const clickSearch = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (window.innerWidth <= 1200 && search_bar.value === false) {
                document.documentElement.style.overflowY = 'hidden';
                search_bar.value = true;
            } else {
                document.documentElement.style.overflowY = 'auto';
                search_bar.value = false;
            }
        }

        const search_input = ref('');

        const search_result = ref([])
        let timerID = null;

        watch(search_input, (curr, old) => {
            search_result.value = []
            clearTimeout(timerID);

            timerID = setTimeout(() => {
                if (curr.trim() === '') return

                search_result.value = ProductData.filter((item) => {
                    return item.product_name.indexOf(curr) !== -1
                })
            }, 2000);

        })

        const closeAllBlock = () => {
            document.documentElement.style.overflowY = 'auto';
            search_bar.value = false;
            side_bar.value = false;
            shop_car.value = false;
        }

        //search result click or shopcar img
        const clickLink = (id) => {
            ROUTER.push({
                name: 'product',
                params: {
                    id: id
                }
            });
            //把所有彈窗關閉
            closeAllBlock();
        }

        //視窗大小有變動就把所有彈窗關閉
        window.addEventListener('resize', () => {
            closeAllBlock();
        })

        //scroll to Top
        const topArrow = () => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }

        //sidebar顯示
        const side_bar = ref(false)
        const showSide = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (window.innerWidth <= 1200 && side_bar.value === false) {
                document.documentElement.style.overflowY = 'hidden';
                side_bar.value = true;
            } else {
                document.documentElement.style.overflowY = 'auto';
                side_bar.value = false;
            }
        }

        /**---------------購物車--------------------**/
        const shop_car_number = computed(() => {
            return store.getters.shop_car_total_count;
        })

        const shop_car_price = computed(() => {
            return store.getters.shop_car_total_price
        })

        const shop_car_content = computed(() => {
            return store.state.shop_car
        })

        const shop_car = ref(false)
        const showShopCar = (e) => {
            //@click.prevent.stop -> 單純阻擋子元件冒泡事件

            // 避免子元件造成連續點擊，且執行下方邏輯
            e.preventDefault();
            e.stopPropagation();

            if (shop_car.value === false) {
                document.documentElement.style.overflowY = 'hidden';
                shop_car.value = true;
            } else {
                document.documentElement.style.overflowY = 'auto';
                shop_car.value = false;
            }
        }

        const removeShopCar = (id) => {
            store.dispatch('removeShopCar', {
                'id': id
            });
        }

        const BODY = document.body;
        const ROUTER = useRouter();

        return {
            clickSearch,
            topArrow,
            showSide,
            showShopCar,
            removeShopCar,
            clickLink,
            search_bar,
            search_input,
            search_result,
            side_bar,
            shop_car,
            shop_car_number,
            shop_car_content,
            shop_car_price,
            BODY,
            ROUTER
        }
    }
}
</script>

<style lang="scss" scoped>
$gray_base: rgba(50, 50, 50, 1);
$gray_hover: rgba(150, 150, 150, 1);

body {
    overflow: auto;
}

.navbar {
    color: black;
    height: 180px;
    position: fixed;
    width: 100vw;
    // transition:background-color 0.5s;
    top: 0;
    left: 0;

    .container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 30px 20px 30px;
        margin: 0 auto;
        height: 100%;
        width: 1400px;
        max-width: 100vw;

        .icons {
            right: 20px;
            top: 15px;
            position: absolute;
            display: grid;
            grid-template-columns: repeat(4, 30px);
            column-gap: 10px;
            color: $gray_base;
            font-size: 1.1em;

            .sidebar-controller {
                display: none;
            }

            >i {
                padding: 5px;
                cursor: pointer;

            }

            i.shop-car {
                position: relative;

                >.shop-count {
                    font-family: Avenir, Helvetica, Arial, sans-serif;
                    font-weight: 400;

                    >div {
                        opacity: .8;
                        position: absolute;
                        top: -5px;
                        right: -8px;
                        width: 18px;
                        height: 18px;
                        background-color: $gray_base;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;

                        >div {
                            font-size: 12px;
                            color: white;
                        }

                    }
                }
            }

        }

        >a {
            >img {
                height: 100px;
                width: 100px;
                cursor: pointer;

            }
        }

        .top-arrow {
            width: 34px;
            height: 34px;
            position: fixed;
            right: 40px;
            bottom: 60px;
            background-color: rgba(255, 255, 255, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.4em;
            color: $gray_hover;
            opacity: 0;
            pointer-events: none;
            transition: 0.3s;
            border-style: solid;
            border-width: 1px;
            border-color: rgba(0, 0, 0, 0.1);
        }

        ul.main-list {
            display: none;
            list-style-type: none;
            padding-top: 10px;

            >li {
                display: flex;
                align-items: center;
                color: $gray_base;
                position: relative;
                padding: 10px 12px 20px 12px;
                font-weight: 600;

                >div {
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    >div {
                        a {
                            color: $gray_base;
                            text-decoration: none;
                        }
                    }

                    >i {
                        padding: 0 5px 0 5px;
                        font-size: 0.75em;
                        transition: transform 0.3s;
                    }
                }

                >div:hover {
                    opacity: 0.7;
                }
            }

            >li:hover {
                ul.sub-list {
                    opacity: 1;
                    pointer-events: all;
                }

                >div {
                    >i {
                        transform: rotate(180deg);
                    }
                }

            }
        }

        ul.main-list:nth-of-type(1) {
            display: flex;
        }

        ul.sub-list {
            opacity: 0;
            pointer-events: none;
            list-style-type: none;
            position: absolute;
            left: 8px;
            top: 100%;
            background-color: rgba(255, 255, 255, 1);
            text-align: left;
            padding: 5px;
            transition: 0.2s;

            >li {
                padding: 10px;
                width: 150px;

                >div {
                    color: $gray_base;
                    cursor: pointer;
                }

                >div:hover {
                    color: $gray_hover;
                }
            }
        }
    }

}

.scroll .navbar {
    background-color: rgba(255, 255, 255, 0.95);
    height: 100px;
    transition: background-color 0.5s;

    >.container {
        flex-direction: row;
        align-items: end;

        >a {
            >img {
                height: 60px;
                width: 60px;
                bottom: 0;
            }
        }

        >div {
            >ul.main-list {
                padding: 0 0 0 30px;
                transform: translateY(10px);
            }
        }

        .top-arrow {
            opacity: 1;
            pointer-events: all;
            cursor: pointer;
        }

    }
}

.dark-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: none;
    z-index: -10;
    cursor: auto;
}

i.search {
    position: relative;
    z-index: 1;
}

i:hover {
    color: $gray_hover;

    .small-search {
        input {
            width: 140px;
            transform: translateX(-140px);
            opacity: 1;
        }

        >div {
            transform: translateX(-140px);
            width: 140px;

            div {
                opacity: 1;
                pointer-events: auto;
                transition: 0.3s;
            }

        }
    }
}

.small-search {

    input:focus,
    input:focus~div {
        width: 140px;
        transform: translateX(-140px);

        div {
            opacity: 1;
            pointer-events: auto;
            transition: 0.3s;
        }

    }
}

.small-search {

    >input {
        position: absolute;
        left: 0;
        top: 5px;
        transition: .3s;
        width: 0px;

        background-color: transparent;
        border-style: none none solid none;
        border-color: $gray_base;
        border-width: 1px;
        outline-style: none;
        color: $gray_base;
        font-size: 14px;
        opacity: 1;
    }

    >input::placeholder {
        color: $gray_base;
    }

    >div {
        position: absolute;
        left: 0;
        width: 0;
        transition: 0.3s;
        overflow: hidden;

        >div {
            font-family: Avenir, Helvetica, Arial, sans-serif;
            white-space: nowrap;
            font-size: 14px;
            text-align: start;
            color: $gray_base;
            opacity: 0;
            transition: 0.1s;
            pointer-events: none;
            padding: 5px 0 3px 5px;
            border-radius: 0 0 2px 2px;
            background-color: rgba(255, 255, 255, .3);
            font-weight: 400;
            text-shadow: 0 0 .5px rgba(0, 0, 0, .6);
        }

        >div:hover {
            background-color: rgba(255, 255, 255, .1);
        }
    }
}

.large-search {
    position: fixed;
    left: 0;
    top: -60px;
    width: 100vw;
    height: 60px;
    display: grid;
    grid-template-columns: 60px 1fr;
    place-items: center;
    background-color: white;
    cursor: auto;

    >i {
        color: $gray_hover;
        pointer-events: none;
    }

    >div {
        width: 100%;
        position: relative;

        >input {
            color: $gray_hover;
            line-height: 20px;
            font-size: 14px;
            height: 20px;
            width: 100%;
            border-style: none none solid none;
            border-width: 1px;
            outline-style: none;
            padding: 0 0 0 5px;
        }

        >div {
            position: absolute;
            left: 0;
            top: 40px;
            color: $gray_base;
            width: 100%;
            display: none;

            >div {
                font-family: Avenir, Helvetica, Arial, sans-serif;
                font-size: 14px;
                font-weight: 400;
                padding: 5px 0 3px 5px;
                border-radius: 0 0 0 3px;
                cursor: pointer;
                text-align: start;
                background-color: rgba(255, 255, 255, .6);
            }

            >div:hover {
                background-color: rgba(255, 255, 255, .3);
            }
        }

    }
}

.active .large-search {
    top: 0px;

    >div {
        >div {
            display: block;
        }
    }
}

.shop-content {
    cursor: auto;
    position: fixed;
    height: 100vh;
    width: 250px;
    background-color: white;
    top: 0;
    right: -250px;
    transition: .5s;
    opacity: 0;
    z-index: 5;
    padding: 0 10px;

    hr {
        opacity: .3;
        color: $gray_hover;
        margin: 20px 0,
    }

    .car-list {
        text-align: start;
        margin: 20px 0;
        height: calc(100vh - 90px);
        overflow: auto;
        color: $gray_hover;
        cursor: auto;

        >div {
            display: grid;
            grid-template-columns: 50px 1fr;
            font-size: 14px;
            column-gap: 10px;

            >img {
                width: 100%;
                cursor: pointer;
            }

            >div {
                padding: 5px 0 0 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                >p {
                    font-family: Avenir, Helvetica, Arial, sans-serif;
                    font-weight: 400;
                    font-size: .8em;
                    letter-spacing: 2px;
                }

                >p:nth-of-type(2) {
                    letter-spacing: 1px;
                    color: rgba(0, 0, 0, .8);
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;

                    >span:nth-of-type(1) {

                        >span {
                            margin: 0 5px;
                        }
                    }

                    >span:nth-of-type(2) {
                        margin-right: 5px;

                        i {
                            cursor: pointer;
                        }
                    }
                }

            }

            >hr {
                grid-row-start: 2;
                grid-column: 1/3;
                height: .5px;
            }
        }
    }

    button {
        font-weight: 600;
        width: 220px;
        height: 40px;
        border-radius: 5px;
        border-color: rgba(200, 200, 200, .6);
        border-width: 1px;
        border-style: solid;
        cursor: pointer;
        transition: .3s;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 14px;
    }

    button:hover {
        background-color: $gray_hover;
        color: white;
    }
}

.shop-car.active {
    .shop-content {
        opacity: 1;
        right: 0;

    }

    .dark-bg {
        opacity: 1;
        display: block;
        pointer-events: all;
        cursor: pointer;
        z-index: 3;
    }
}

#menus {
    z-index: 15;

    hr {
        display: none;
    }
}

@media (max-width: 1200px) {
    .scroll .navbar {
        height: 60px;

        >.container {
            padding: 0;

            >a {
                display: flex;
                height: 100%;

                >img {
                    height: 44px;
                    width: 44px;
                    margin: auto 15px auto 15px;
                    cursor: pointer;
                }
            }
        }
    }

    .navbar {
        height: 60px;

        .container {
            flex-direction: row;
            align-items: end;
            padding: 0;

            .icons {
                grid-template-columns: repeat(5, 30px);
                right: 0px;
                font-size: 1.3em;

                i:nth-of-type(2) {
                    display: none;
                }

                .sidebar-controller {
                    display: block;
                    grid-column: 4 / 6;
                }
            }

            i.search.active {

                .dark-bg {
                    display: block;
                    pointer-events: all;
                }
            }

            .top-arrow {
                right: 20px;
                bottom: 20px;
            }

            >a {
                display: flex;
                height: 100%;

                >img {
                    height: 44px;
                    width: 44px;
                    margin: auto 15px auto 15px;
                    cursor: pointer;
                }
            }

        }
    }

    i:hover {

        .small-search {

            div,
            input {
                display: none;
            }
        }

    }

    #menus {
        position: fixed;
        top: 0;
        left: -250px;
        width: 250px;
        height: 100vh;
        padding: 10px;
        background-color: white;
        transition: .3s;
        overflow: auto;

        hr {
            display: block;
        }

        .dark-bg {
            opacity: 0;
            pointer-events: none;
            display: block;
            left: 0px;
            transition: .3s;
        }

        >ul.main-list {
            display: flex;
            flex-direction: column;
            padding: 0 0 0 0px;
            transform: translateY(0px);

            >li {
                text-align: start;
                display: block;
                position: relative;
                background-color: white;

                >div {
                    background-color: white;
                    justify-content: space-between;
                }

                >ul.sub-list {
                    display: block;
                    opacity: 1;
                    background-color: white;
                    position: relative;
                    opacity: 0;
                    transition: .3s;
                    margin-top: -10px;
                    max-height: 0px;

                    li {
                        display: block;
                    }
                }
            }

            >li:hover {
                >ul {
                    opacity: 1;
                    margin-top: 0px;
                    max-height: 100px;
                }
            }
        }
    }

    #menus.active {
        left: 0px;

        >.dark-bg {
            opacity: 1;
            display: block;
            pointer-events: all;
            cursor: pointer;
            left: 250px;
        }
    }
}
</style>
