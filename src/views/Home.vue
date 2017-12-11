<template>
    <div class="home">
        <h1>Quiz</h1>
        <router-link to="/quiz">Start</router-link>
        <router-link to="/leaderboard">Highscore-Tabelle</router-link>
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
        background-color: #6495ed;
        padding: 10px;
        color: #ffffff;
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
        background-color: #6287de;
    }
</style>
