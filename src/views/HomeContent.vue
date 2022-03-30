<template>
<div class="container">
    <img src="../../public/images/main.png" alt="">

    <h2 id="desert">草莓季</h2>
    <svg class="short-line" xmlns="http://www.w3.org/2000/svg" width="30" height="10" version="1.1">
        <line x1="5" y1="3" x2="25" y2="3" stroke-width="4.5" stroke="rgb(80,80,80)" stroke-linecap="round" />
    </svg>

    <div class="product-list">
        <div v-for="(product, index) in 5" :key="'prdouct' + index">
            <product-list> </product-list>
        </div>
    </div>

    <div class="space"></div>

    <div class="slider">
        <slider></slider>
    </div>

    <h2 id="end">白‧甜點｜常溫禮盒</h2>
    <svg class="short-line" xmlns="http://www.w3.org/2000/svg" width="30" height="10" version="1.1">
        <line x1="5" y1="3" x2="25" y2="3" stroke-width="5" stroke="rgb(80,80,80)" stroke-linecap="round" />
    </svg>

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
        let desert_section;
        const onScroll = () => {

            if (scrollY < 200) {
                history.replaceState('', '', '/')
            }

            if (Math.abs(desert_section.offsetTop - scrollY) < 200) {
                history.replaceState('', '', '/#desert')
            }

            if (scrollY === (document.documentElement.offsetHeight - window.innerHeight)) {
                history.replaceState('', '', '/#end')
            }
        }

        onMounted(() => {
            desert_section = document.getElementById('desert');
            window.addEventListener('scroll', onScroll)
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', onScroll)

        })

        return {}
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
    margin: 0 auto;
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
