<template>
<div class="container">
    <img src="../../public/images/main.png" alt="">

    <h2 id="desert">草莓季</h2>
    <svg class="short-line" xmlns="http://www.w3.org/2000/svg" width="30" height="10" version="1.1">
        <line x1="5" y1="3" x2="25" y2="3" stroke-width="4.5" stroke="rgb(80,80,80)" stroke-linecap="round" />
    </svg>

    <div class="product-list">
        <div v-for="product in products" :key="product.id">
            <product-list :url="'product'" :id="product.id" :product_name="product.product_name" :price="product.price"> </product-list>
        </div>
    </div>

    <div class="space"></div>

    <div class="slider">
        <slider></slider>
    </div>

    <h2 id="set">甜點｜禮盒</h2>
    <svg class="short-line" xmlns="http://www.w3.org/2000/svg" width="30" height="10" version="1.1">
        <line x1="5" y1="3" x2="25" y2="3" stroke-width="5" stroke="rgb(80,80,80)" stroke-linecap="round" />
    </svg>

    <div class="product-list">
        <div v-for="product in product_sets" :key="product.id">
            <product-list :url="'product_set'" :id="product.id" :product_name="product.product_name" :price="product.price"> </product-list>
        </div>
    </div>

</div>
</template>

<script>
import ProductList from '../components/ProductList.vue';
import Slider from '../components/Slider.vue';

//抓現在使用的ROUTER
import {
    useRouter
} from 'vue-router';

import {
    ref,
    onUnmounted,
    onMounted
} from 'vue';

export default {
    setup() {
        //避免事件堆疊
        let scrolling = ref(false)

        //url隨scroll變更
        let desert_section;
        let set_section;
        const onScroll = () => {
            //navbar scroll偵測
            let body = document.querySelector('body')
            if (window.scrollY > 50) {
                body.classList.add('scroll')
            } else {
                body.classList.remove('scroll')
            };
            //#的事件偵測
            let href = window.location.pathname;

            if (scrolling.value) {
                return
            }
            scrolling.value = true;
            let range = (window.innerWidth / 10);
            if (scrollY < range) {
                history.replaceState(history.state, '', href)
            }

            if (desert_section.offsetTop < (scrollY + range)) {
                history.replaceState(history.state, '', href + '#desert')
            }

            if (set_section.offsetTop < (scrollY + range)) {
                history.replaceState(history.state, '', href + '#set')
            }

            setTimeout(() => {
                scrolling.value = false
            }, 50);

        }

        onMounted(() => {
            set_section = document.getElementById('set');
            desert_section = document.getElementById('desert');
            window.addEventListener('scroll', onScroll)

        });

        onUnmounted(() => {
            window.removeEventListener('scroll', onScroll)

        })

        //product list 內容設定

        const products = [{
                id: 1,
                product_name: 'Kiss me',
                price: 130
            },
            {
                id: 2,
                product_name: '莓好時光',
                price: 1080
            },
            {
                id: 3,
                product_name: '季節限定草莓千層',
                price: 230
            },
            {
                id: 4,
                product_name: '季節草莓塔',
                price: 220
            },
            {
                id: 5,
                product_name: '娜特莉',
                price: 130
            }
        ]

        const product_sets = [{
                id: 10001,
                product_name: '客製化禮盒',
                price: 1300
            },
            {
                id: 10002,
                product_name: '白甜點常溫禮盒',
                price: 880
            },
            {
                id: 10003,
                product_name: '月光 檸檬塔禮盒',
                price: 1280
            },
            {
                id: 10004,
                product_name: '可麗露禮盒',
                price: 680
            },
        ]

        return {
            products,
            product_sets
        }
    },
    components: {
        'ProductList': ProductList,
        'Slider': Slider
    }
}
</script>

<style lang="scss" scoped>
.container {

    >img {
        width: 100vw;
    }

    >h2 {
        font-size: 1.4em;
        padding: 30px 10px;
        padding-bottom: 10px;
        letter-spacing: 5px;
        margin-right: -5px; //置中
    }
}

.short-line {
    margin: 10px 0 20px 0;

}

.product-list {
    width: 1140px;
    max-width: 95vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 0 auto;
    column-gap: 40px;
    row-gap: 15px;
    place-content: center;
}

.space {
    height: 50px;
}

.slider {
    width: 1140px;
    max-width: 100vw;
    margin: 10px auto 20px auto;
}

@media (max-width: 1200px) {
    .product-list {
        grid-template-columns: repeat(3, 1fr);

    }
}

@media (max-width: 800px) {
    .product-list {
        grid-template-columns: repeat(2, 1fr);

    }
}

@media (max-width: 400px) {
    .product-list {
        grid-template-columns: 1fr;

    }
}
</style>
