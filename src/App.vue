<template>
<Nav style="z-index:100"></Nav>

<router-view></router-view>

<footer>
    this is a info.
</footer>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
    setup() {

        return {}
    },
    components: {
        'Nav': Nav
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: rgb(100, 100, 100)
}
::-webkit-scrollbar{
    width:0px;
}
html {
    overflow-x: hidden;
    scroll-behavior: smooth;
    // -webkit-overflow-scrolling: touch;
    
}

body {
    overflow-x: hidden;
    
}

nav,
footer {
    display: block;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
</style>
