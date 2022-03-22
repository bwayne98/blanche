<template>
<nav>
  <Nav></Nav>
</nav>
<content>
    <img src='../public/images/main.png' alt="main" style="width:100vw">
</content>
<footer>
    this is a info.
</footer>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
    setup() {
      
      return{}
    },
    components:{
      'Nav' : Nav
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav, content, footer{
  display: block;
}

content{
  height: 300vh;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
