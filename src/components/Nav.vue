<template>
<div class="navbar" id="navbar">
    <div class="container">
        <div class="icons">

            <i class="fa-solid fa-magnifying-glass search">
                <input type="text" placeholder="找商品">
            </i>
            <i class="fa-solid fa-comment"></i>
            <i class="fa-solid fa-user"></i>
            <i class="fa-solid fa-bag-shopping"></i>
            <i class="fa-solid fa-bars"></i>
        </div>
        <img src="https://img.shoplineapp.com/media/image_clips/6177d14056a0c000203d646c/original.png?1635242304" alt="Logo">
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
</template>

<script>
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

        return {}
    }
}
</script>

<style lang="scss" scoped>
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
        // justify-content: center;
        align-items: center;
        padding: 10px 30px 20px 30px;
        margin: 0 auto;
        height: 100%;
        width: 1400px;
        max-width: 100vw;

        .icons {
            right: 20px;
            top: 10px;
            position: absolute;
            display: grid;
            grid-template-columns: repeat(4, 20px) 50px;
            column-gap: 15px;
            color: rgba(0, 0, 0, 0.5);
            i {
                padding: 5px;
                cursor: pointer;
            }
            i.search{
                position: relative;
                
                > input {
                    background-color: transparent;
                    border-style: none none solid none;
                    border-width: 1px;
                    border-color: rgba(0, 0, 0, 0.5);
                    bottom:0;
                    width: 0px;
                    height: 80%;
                    position: absolute;
                    left:0px;
                    outline:none;
                    color: rgba(0, 0, 0, 0.6);
                    transition: 0.4s linear;
                    font-size: 0.8em;
                }
                >input::placeholder{
                    color: rgba(0, 0, 0, 0.6);
                }
                >input:focus{
                    left:-120px;
                    width:120px;
                }
            }
            i.search:hover{
                >input{
                    left:-120px;
                    width:120px;
                }
            }
        }

        img {
            height: 100px;
            width: 100px;
            cursor: pointer;
        }

        ul.main-list {
            display: flex;
            list-style-type: none;
            padding-top: 10px;

            >li {
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
                    color: rgba(0, 0, 0, 0.5)
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
                    cursor: pointer;
                }

                >span:hover {

                    color: rgba(0, 0, 0, 0.5)
                }
            }
        }
    }

}

.navbar.scroll {
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
</style>
