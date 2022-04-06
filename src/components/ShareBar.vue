<template lang="en">
<div class="sharebar-container">
    <span>分享到</span>
    <span><i class="fa-brands fa-facebook-square" @click="clickFacebookButton()"></i></span>
    <span><i class="fa-brands fa-line" @click="clickLineButton()"></i></span>
    <span><i class="fa-brands fa-twitter-square" @click="clickTwitterButton()"></i></span>
</div>
</template>

<script>
export default {
    setup() {

        const clickLineButton = () =>{
            window.open('https://social-plugins.line.me/lineit/share?url=https://bwayne98.github.io/blanche/',"_blank",'resizable=no,top=200,left=200,width=500,height=500')
        }

        const clickFacebookButton = () =>{
            window.open('https://www.facebook.com/sharer/sharer.php?u=https://bwayne98.github.io/blanche/',"_blank",'resizable=no,top=200,left=200,width=500,height=500')
        }

        const clickTwitterButton = () =>{
            window.open('https://twitter.com/share?url=https://bwayne98.github.io/blanche/',"_blank",'resizable=no,top=200,left=200,width=500,height=500')
        }
        
        return{clickLineButton,clickFacebookButton,clickTwitterButton}

    },
}
</script>

<style lang="scss" scoped>
.sharebar-container {
    display: flex;
    align-items: center;

    span {
        padding-right: 5px;
        font-size: 14px;
        font-weight: 600;

        a {
            color: gray;
        }

        i {
            font-size: 20px;
            cursor: pointer;
            transition: .2s;
        }

        i:hover {
            transform: translateY(-3px);
        }

    }
}
</style>
