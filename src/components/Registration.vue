<template>
    <div class="registration">
        <label for="name">Vor-/Nachname</label>
        <input v-model="name" id="name" type="text" maxlength="45"/>
        <button @click="register()">Eintragen</button>
    </div>
</template>

<script>
  export default {
    name: 'Registration',
    props: [
      'score'
    ],
    data () {
      return {
        'name': null
      }
    },
    methods: {
      register: function () {
        let leaderboard = localStorage.getItem('leaderboard')
        let persons = leaderboard !== null ? JSON.parse(leaderboard) : []
        if (this.name !== null) {
          persons.push({
            name: this.name,
            score: this.score
          })
          localStorage.setItem('leaderboard', JSON.stringify(persons))
          window.location = '/'
        }
      }
    }
  }
</script>

<style scoped>

    input {
        border-radius: 0;
        border: none;
        width: 100%;
        padding: 10px 10px 5px;
        border-bottom: 4px solid #808080;
        margin-bottom: 20px;
        font-size: 1em;
        -webkit-transition: all 250ms ease-in-out;
        -moz-transition: all 250ms ease-in-out;
        -ms-transition: all 250ms ease-in-out;
        -o-transition: all 250ms ease-in-out;
        transition: all 250ms ease-in-out;
    }

    input:focus, input:hover {
        border-bottom-color: #6287de;
    }
</style>
