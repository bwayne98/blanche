<template>
<div class="image-section">
    <div>
        <button @click="selectImage(true)" :disabled="small_images_select_index === 0"><i class="fa-solid fa-chevron-up"></i></button>
        <div id="small-images">
            <img v-for="(pic,index) in small_images_count" :key="'small-image' + index" :src="require('../../public/images/'+ url +'/' + id + '.png')" alt="" :class="{selected : small_images_select_index === index }" :style="{opacity : 1 - (index + 1) * 0.1}" @click="clickImage(index)">
        </div>

        <button @click="selectImage(false)" :disabled="small_images_select_index === small_images_count - 1"><i class="fa-solid fa-chevron-down"></i></button>
    </div>
    <img :src="require('../../public/images/'+ url +'/' + id + '.png')" alt="" :style="{opacity : 1 - small_images_select_index * 0.1 + 0.1 }">
    <div class="share-bar">
        分享到
    </div>
</div>
</template>

<script>
import {
    ref,
    onMounted
} from 'vue'

export default {
    props:['id', 'url'],
    setup(prop) {
        //圖片選擇控制
        const small_images_count = ref(9);
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

        onMounted(() => {

            small_images_container = document.getElementById('small-images');
            small_images = small_images_container.children;
        });

        return {
            small_images_select_index,
            small_images_count,
            selectImage,
            clickImage,
        }
    },
}
</script>

<style lang="scss" scoped>
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

@media (max-width:600px) {
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
