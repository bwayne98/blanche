<template>
<div class="product">
    <div class="image">
        <img src="../../public/images/product.png" alt="">
        <div></div>
        <button type="button">加入購物車</button>
    </div>

    <h2>Kiss Me</h2>
    <p>NT$130</p>

    <button><i class="fa-solid fa-cart-shopping"></i></button>

</div>
</template>

<script>
export default {
    setup() {

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

        >div {
            position: absolute;
            width: 100%;
            height: 100%;
            cursor:help;
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
    }

    >h2 {
        width: 100%;
        background-color: white;
        font-size: 0.8em;
        font-weight: 400;
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
        font-size:1.1em;
        color:rgb(100,100,100);
        cursor: pointer;
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

    >div {
        background-color: rgba(0, 0, 0, 0.6);
    }

}

@media (max-width: 800px) {
    .product {
        button {
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
