<template>
<div class="container">
    <img src="../../public/images/main.png" alt="">
    <h2>草莓季</h2>
    <div class="center-line">
        <p>－</p>
    </div>
    <div class="product-list">
        <div v-for="(product, index) in 7" :key="'prdouct' + index">
            <product-list> </product-list>
        </div>
    </div>
    <h2>白‧甜點｜常溫禮盒</h2>
    <div class="center-line">
        <p>－</p>
    </div>

</div>
</template>

<script>
import ProductList from '../components/ProductList.vue'

export default {
    setup() {

        return {}
    },
    components: {
        'ProductList': ProductList
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

    >.center-line {
        padding-bottom: 20px;

        >p {
            transform: scaleX(450%) scaleY(220%);
        }
    }
}

.product-list {
    width: 1140px;
    max-width: 100vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 0 auto;
    column-gap: 40px;
    row-gap: 15px;
    place-content: center;

}

@media (max-width: 1200px) {
    .product-list {
        padding: 0 30px;
        grid-template-columns: repeat(3, 1fr);

    }
}

@media (max-width: 800px) {
    .product-list {
        padding: 0 30px;
        grid-template-columns: repeat(2, 1fr);

    }
}

@media (max-width: 400px) {
    .product-list {
        padding: 0 30px;
        grid-template-columns: 1fr;

    }
}

</style>
