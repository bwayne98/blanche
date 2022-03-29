<template>
<div class="container">
    <div class="images">
        <img src="../../public/images/slider/99.png" alt="blank">
        <img class="slider-image-right" v-for="(img,index) in slider_number" :key="'img-right' + index" :src="require('../../public/images/slider/' + index + '.png')" :alt="index" :class="{'move-in' : count === index}">
        <img class="slider-image-left" v-for="(img,index) in slider_number" :key="'img-left' + index" :src="require('../../public/images/slider/' + index + '.png')" :alt="index" :class="{'standby' : count === index}">
    </div>
    <div class="buttons">
        <button @click="select_image(index)" :disabled="count === index" v-for="(img,index) in slider_number" :key="'button' + index" type="button"></button>
    </div>
</div>
</template>

<script>
import {
    ref
} from 'vue'

export default {
    setup() {

        //自動輪播
        const slider_number = ref(4);
        const count = ref(0);
        //避免自動與手動衝突
        const clicked = ref(false);

        setInterval(() => {
            if (clicked.value) {
                return;
            }
            nextImage();
        }, 5000);
        //自動輪播
        const nextImage = () => {
            count.value = (count.value + 1) % (slider_number.value)
            clicked.value = true
            setTimeout(() => {
                clicked.value = false
            }, 600);
        }
        // 手動選擇
        const select_image = (index) => {

            if (clicked.value) {
                return;
            }

            count.value = index;
            clicked.value = true
            setTimeout(() => {
                clicked.value = false
            }, 600);
        }

        return {
            count,
            slider_number,
            clicked,
            select_image
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.images {

    >img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    >img.slider-image-right {
        opacity: 0.5;
        transition: 0s;
        transform: translateX(100%);
    }

    >img.slider-image-left {
        opacity: 0.5;
        transition: .5s;
        transform: translateX(-100%);
    }

    >img.move-in {
        opacity: 1;
        transition: .5s;
        transform: translateX(0);
        z-index: 10;
    }

    >img.standby {
        opacity: 1;
        transition: 0s;
        transform: translateX(0%);
        transition-delay: .5s;
    }

    // img.move-out {
    //     opacity: 0;
    //     transition: 0.5s;
    //     transform: translateX(-101%);
    //     z-index:10;
    // }

    >img:nth-of-type(1) {
        position: relative;
        z-index: -10;
    }

}

.buttons {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 5px;
    bottom: 10px;

    >button {
        z-index: 20;
        border-style: none;
        // border-color: white;
        // border-width: 1px;
        background-color: white;
        border-radius: 100%;
        margin: 5px;
        width: 8px;
        height: 8px;
        cursor: pointer;
    }

    >button:disabled {
        background-color: rgb(150, 150, 150);
        box-shadow: 0 0 0 1px white;
        cursor: auto;
    }
}
</style>
