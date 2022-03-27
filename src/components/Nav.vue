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
            <i class="fa-solid fa-bag-shopping"></i>
            <i class="fa-solid fa-bars sidebar-controller"></i>
        </div>
        <img src="https://img.shoplineapp.com/media/image_clips/6177d14056a0c000203d646c/original.png?1635242304" alt="Logo">
        <div class="menus">
            <ul class="main-list">
                <li> <span>甜點 <i class="fa-solid fa-angle-down"></i> </span>
                    <ul class="sub-list">
                        <li><span> 現場專區 </span></li>
                        <li><span> 草莓季 </span></li>
                    </ul>
                </li>
                <li> <span> 禮盒 <i class="fa-solid fa-angle-down"></i> </span>
                    <ul class="sub-list">
                        <li><span> 常溫宅配專區 </span></li>
                        <li><span> 冷凍宅配專區 </span></li>
                    </ul>
                </li>
                <li><span> 客製化蛋糕 </span></li>
                <li><span> 關於我們 </span></li>
                <li><span> 聯絡我們 </span></li>
                <li><span> 銷售據點 </span></li>
            </ul>
        </div>

    </div>

</div>
</template>

<script>
import {
    ref
} from 'vue';

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
        //search bar controll
        const search_bar = ref(false);
        const clickSearch = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (window.innerWidth <= 1200 && search_bar.value === false) {
                document.body.style.overflow = 'hidden';
                search_bar.value = true;
            } else {
                document.body.style.overflow = 'auto';
                search_bar.value = false;
            }
        }

        window.addEventListener('resize', () => {
            document.body.style.overflow = 'auto';
            search_bar.value = false;
        })

        return {
            clickSearch,
            search_bar
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
            right: 30px;
            top: 15px;
            position: absolute;
            display: grid;
            grid-template-columns: repeat(4, 20px);
            column-gap: 15px;
            color: $gray_base;

            .sidebar-controller {
                display: none;
            }

            >i {
                padding: 5px;
                cursor: pointer;
            }

            i.search {
                position: relative;

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
        }

        >img {
            height: 100px;
            width: 100px;
            cursor: pointer;
        }

        ul.main-list {
            display: flex;
            list-style-type: none;
            padding-top: 10px;

            >li {
                color: $gray_base;
                font-weight: 600;
                position: relative;
                padding: 10px 12px 10px 12px;

                >span {
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    >i {
                        padding: 0 5px 0 5px;
                        font-size: 0.75em;
                        transition: transform 0.3s;
                    }
                }

                >span:hover {
                    opacity: 0.7;
                }
            }

            >li:hover {
                ul.sub-list {
                    opacity: 1;
                    pointer-events: all;
                }

                >span {
                    >i {
                        transform: rotate(180deg);
                    }
                }
            }
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

                >span {
                    color: $gray_base;
                    cursor: pointer;
                }

                >span:hover {
                    color: $gray_hover;
                }
            }
        }
    }

}

.scroll {
    background-color: rgba(255, 255, 255, 0.995);
    height: 100px;
    transition: background-color 0.5s;

    >.container {
        flex-direction: row;
        align-items: end;

        >img {
            height: 60px;
            width: 60px;
            bottom: 0;
        }

        >ul.main-list {
            padding: 0 0 0 30px;
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

@media (max-width: 1200px) {
    .navbar {
        height: 60px;

        .container {
            flex-direction: row;
            align-items: end;
            padding: 0;

            .icons {
                grid-template-columns: repeat(5, 20px);
                font-size: 1.1em;

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

            >img {
                height: 44px;
                width: 44px;
                margin: auto 15px auto 15px;
                cursor: pointer;
            }

            ul.main-list {
                li {
                    display: none;
                }

            }
        }
    }

}
</style>
