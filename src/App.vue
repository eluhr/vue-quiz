<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>

    @import "assets/bootstrap.min.css";
    @font-face {
        font-family: garamontamstsb;
        src: url(/static/files/GaramontAmstSB-Roman.otf);
    }

    * {
        font-family: garamontamstsb, "Helvetica Neue", Helvetica, Arial, sans-serif;
        letter-spacing: 0.005em;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
        font-weight: 400;
    }

    html,body {
        background-color: #fff9d7;
    }

    html {
      font-size: 2em;
    }
    body {
        margin: 0;
        padding: 0;
        color: #000000;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    *,:after, :before,*:after, *:before {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    *:focus {
        outline: none;
    }

    #app {
        margin: 15px 30px;
    }
    h1 {
        margin-top: 0;
        text-align: center;
        font-weight: 400;
    }

    button {
        font-size: 1em;
        background-color: #fff9d7;
        border-radius: 0;
        border: none;
        padding: 10px;
        color: #000000;
        cursor: pointer;
        -webkit-transition: all 250ms ease-in-out;
        -moz-transition: all 250ms ease-in-out;
        -ms-transition: all 250ms ease-in-out;
        -o-transition: all 250ms ease-in-out;
        transition: all 250ms ease-in-out;
    }

    button:hover,button:active {
        background-color: #fff9d7;
    }

    a {
        display: block;
        text-decoration: none;
        -webkit-transition: all 250ms ease-in-out;
        -moz-transition: all 250ms ease-in-out;
        -ms-transition: all 250ms ease-in-out;
        -o-transition: all 250ms ease-in-out;
        transition: all 250ms ease-in-out;
    }

    @media (max-width: 768px) {
        html {
            font-size: 1.5em;
        }
        button {
            display: block;
            width: 100%;
        }
    }
</style>
