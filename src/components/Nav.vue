<template>
<div class="navbar" id="navbar">
    <div class="container">
        <div class="icons">

            <i class="fa-solid fa-magnifying-glass search" @click="(e)=>clickSearch(e)" :class="{active : search_bar}">
                <input type="text" placeholder="找商品">
                <div @click.prevent.stop class="search-bar">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="找商品">
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
                            <img :src="require('../../public/images/' + product.url + '/' + product.id + '.png')" alt="">
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
        <a href="/"><img src="https://img.shoplineapp.com/media/image_clips/6177d14056a0c000203d646c/original.png?1635242304" alt="Logo"></a>
        <div class="top-arrow" @click="topArrow">
            <i class="fa-solid fa-arrow-up"></i>
        </div>
        <div id="menus" :class="{active : side_bar}" style="">

            <ul class="main-list">
                <li>
                    <div>
                        <div> <a href="#desert"> 甜點 </a> </div> <i class="fa-solid fa-angle-down"></i>
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
                        <div> <a href="#set"> 禮盒 </a></div> <i class="fa-solid fa-angle-down"></i>
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
                        <div> 甜點 </div> <i class="fa-solid fa-angle-down"></i>
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
                        <div> 禮盒 </div> <i class="fa-solid fa-angle-down"></i>
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
    reactive
} from 'vue';

import store from '../store/store.js'

export default {

    setup() {
        //scoll 位置偵測
        window.addEventListener('scroll', () => {
            let nav = document.getElementById('navbar')
            if (window.scrollY > 50) {
                nav.classList.add('scroll')
            } else {
                nav.classList.remove('scroll')
            };
        })

        // document.body.addEventListener('touchmove', () => {
        //     let nav = document.getElementById('navbar')
        //     if (window.scrollY > 50) {
        //         nav.classList.add('scroll')
        //     } else {
        //         nav.classList.remove('scroll')
        //     };
        // })
        //search bar controll
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

        window.addEventListener('resize', () => {
            document.documentElement.style.overflowY = 'auto';
            search_bar.value = false;
            side_bar.value = false;
            document.querySelector('.shop-car').classList.remove('active')
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
            // console.log(e);
            e.preventDefault();
            e.stopPropagation();
            // not work , use @click.prevent.stop
            if (shop_car.value === false) {
                document.documentElement.style.overflowY = 'hidden';
                shop_car.value = true;
            } else {
                document.documentElement.style.overflowY = 'auto';
                shop_car.value = false;
            }
        }

        const removeShopCar = (id) => {
            store.dispatch('removeShopCar', {'id':id});
        }

        return {
            clickSearch,
            topArrow,
            showSide,
            showShopCar,
            removeShopCar,
            search_bar,
            side_bar,
            shop_car,
            shop_car_number,
            shop_car_content,
            shop_car_price
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

            i.search {
                position: relative;
                z-index: 1;

                >.search-bar {
                    display: grid;
                    grid-template-columns: 30px 1fr;
                    column-gap: 10px;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 60px;
                    background-color: white;
                    padding: 20px 20px;
                    transition: 0.5s;
                    opacity: 0;
                    pointer-events: none;

                    >i {
                        align-self: center;
                    }

                    >input {
                        border-style: none none solid none;
                        border-width: 1px;
                        outline: none;
                        font-size: 0.8em;
                        color: $gray_hover;
                    }
                }

                >input {
                    background-color: transparent;
                    border-style: none none solid none;
                    border-width: 1px;
                    border-color: $gray_base;
                    bottom: 0;
                    width: 0px;
                    height: 80%;
                    position: absolute;
                    left: 0px;
                    outline: none;
                    color: $gray_base;
                    transition: 0.4s linear;
                    font-size: 0.9em;
                }

                >input::placeholder {
                    color: $gray_base;
                }

                >input:focus {
                    left: -120px;
                    width: 120px;
                }
            }

            i:hover {
                color: $gray_hover;
            }

            i.search:hover {
                >input {
                    left: -120px;
                    width: 120px;
                }
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
                            font-size: 1px;
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

.scroll {
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
                    font-size:.8em;
                    letter-spacing: 2px;
                }

                >p:nth-of-type(2) {
                    letter-spacing: 1px;
                    color:rgba(0,0,0,.8);
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
    hr {
        display: none;
    }
}

@media (max-width: 1200px) {
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

                i.search:hover {
                    >input {
                        display: none;
                    }
                }

                i.search.active {
                    >.search-bar {
                        opacity: 1;
                        pointer-events: all;
                        cursor: auto;
                    }

                    .dark-bg {
                        display: block;
                        pointer-events: all;
                    }

                }

            }

            .top-arrow {
                right: 20px;
                bottom: 20px;
            }

            >a {
                >img {
                    height: 44px;
                    width: 44px;
                    margin: auto 15px auto 15px;
                    cursor: pointer;
                }
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

                >ul {
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
