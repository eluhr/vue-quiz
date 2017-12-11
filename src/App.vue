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
    * {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        letter-spacing: 0.005em;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
        font-weight: 300;
    }

    html {
      font-size: 2em;
    }

    html,body {
        height: 100%;
    }
    body {
        margin: 0;
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
        margin: 40px;
    }
    h1 {
        margin-top: 0;
        text-align: center;
        font-weight: 400;
    }

    button {
        font-size: 1em;
        background-color: #6495ed;
        border-radius: 0;
        border: none;
        padding: 10px;
        color: #ffffff;
        cursor: pointer;
        -webkit-transition: all 250ms ease-in-out;
        -moz-transition: all 250ms ease-in-out;
        -ms-transition: all 250ms ease-in-out;
        -o-transition: all 250ms ease-in-out;
        transition: all 250ms ease-in-out;
    }

    button:hover,button:active {
        background-color: #6287de;
    }

    a {
        display: block;
        color: #6495ed;
        text-decoration: none;
        -webkit-transition: all 250ms ease-in-out;
        -moz-transition: all 250ms ease-in-out;
        -ms-transition: all 250ms ease-in-out;
        -o-transition: all 250ms ease-in-out;
        transition: all 250ms ease-in-out;
    }
    a:hover,a:active {
        color: #6287de;
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
