<template>
    <div class="home">
        <h1>Quiz</h1>
        <router-link to="/quiz">Neues Spiel</router-link>
    </div>
</template>

<script>
  export default {
    name: 'Home'
  }
</script>

<style scoped>
    .home {
        height: calc(100vh - 80px);
    }
    a {
        background-color: #fff9d7;
        border: 1px solid #000000;
        max-width: 200px;
        display: block;
        margin: 0 auto;
        padding: 10px;
        color: #000000;
        cursor: pointer;
        margin-bottom: 20px;
        text-align: center;
        -webkit-transition: all 250ms ease-in-out;
        -moz-transition: all 250ms ease-in-out;
        -ms-transition: all 250ms ease-in-out;
        -o-transition: all 250ms ease-in-out;
        transition: all 250ms ease-in-out;
    }

    a:hover,a:active {
        background-color: #000000;
        color: #fff9d7;
    }
</style>
