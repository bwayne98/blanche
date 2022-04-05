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
        <div>
            <div class="image-section">
                <div>
                    <button @click="selectImage(true)" :disabled="small_images_select_index === 0"><i class="fa-solid fa-chevron-up"></i></button>
                    <div id="small-images">
                        <img v-for="(pic,index) in 8" :key="'small-image' + index" :src="require('../../public/images/product/1.png')" alt="" :class="{selected : small_images_select_index === index }" :style="{opacity : 1 - (index + 1) * 0.1}" @click="clickImage(index)">
                    </div>

                    <button @click="selectImage(false)" :disabled="small_images_select_index === 7"><i class="fa-solid fa-chevron-down"></i></button>
                </div>
                <img :src="require('../../public/images/product/1.png')" alt="" :style="{opacity : 1 - small_images_select_index * 0.1 + 0.1 }">
                <div class="share-bar">
                    分享到
                </div>
            </div>
            <div class="info-section">
                <h1>Kiss Me</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, aspernatur.</p>
                <hr>
                <p>NT$130</p>
                <p>數量</p>
                <div>
                    <button @click="clickOrderNumber(false)" :disabled="order_number <= 1"> – </button>
                    <input type="number" name="" id="" v-model="order_number" @blur="checkOrderNumber">
                    <button @click="clickOrderNumber(true)"> + </button>
                </div>

                <button>加入購物車</button>
            </div>
        </div>
    </div>
    <div class="description">3</div>
</div>
</template>

<script>
import {
    onMounted,
    ref
} from "vue";

import {
    useRoute
} from 'vue-router';

export default {

    setup(prop) {
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
        //獲取params
        const ROUTE = useRoute();
        const ID = ROUTE.params.id;

        //綁定navbar scroll class
        const BODY = document.body;

        //圖片選擇控制
        const small_images_select_index = ref(0);

        let small_images_container, small_images;

        const selectImage = (boolean) => {

            small_images_select_index.value = boolean ? small_images_select_index.value - 1 : small_images_select_index.value + 1;

            let image_top = small_images[small_images_select_index.value].offsetTop - 50;
            let image_bottom = small_images[small_images_select_index.value].offsetHeight + small_images[small_images_select_index.value].offsetTop - small_images_container.offsetHeight - 20;

            let scroll_top = small_images_container.scrollTop;
            let container_height = small_images_container.offsetHeight;

            if (boolean) {
                if (image_top - scroll_top > container_height) {
                    small_images_container.scrollTop = image_bottom;
                } else {
                    small_images_container.scrollTop = Math.min(small_images_container.scrollTop, small_images[small_images_select_index.value].offsetTop - 50);
                }
            } else {
                if (scroll_top - image_bottom > container_height) {
                    small_images_container.scrollTop = image_top;
                }
                small_images_container.scrollTop = Math.max(small_images_container.scrollTop, small_images[small_images_select_index.value].offsetHeight + small_images[small_images_select_index.value].offsetTop - small_images_container.offsetHeight - 20);
            }
        }

        const clickImage = (index) => {
            let num = parseInt(index);
            if (num === small_images_select_index.value) {
                return;
            }

            let diff = num - small_images_select_index.value;
            small_images_select_index.value = num;

            if (diff < 0) {
                small_images_container.scrollTop = Math.min(small_images_container.scrollTop, small_images[small_images_select_index.value].offsetTop - 50);
            } else {
                small_images_container.scrollTop = Math.max(small_images_container.scrollTop, small_images[small_images_select_index.value].offsetHeight + small_images[small_images_select_index.value].offsetTop - small_images_container.offsetHeight - 20);
            }
        }

        //加入購物車
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

        onMounted(() => {
            BODY.classList.add("scroll");

            small_images_container = document.getElementById('small-images');
            small_images = small_images_container.children;
        });

        return {
            ID,
            BODY,
            small_images_select_index,
            order_number,
            selectImage,
            clickImage,
            checkOrderNumber,
            clickOrderNumber,
        }
    },
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
