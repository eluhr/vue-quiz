<template>
    <div class="leaderboard">
        <router-link to="/"><img src="/static/files/arrow-back.svg" alt="Zurück"></router-link>
        <h1>Highscore-Tabelle</h1>
        <table v-if="persons.length > 0">
            <thead>
            <tr>
                <th>Platz</th>
                <th>Vor-/Nachname</th>
                <th>Punktzahl</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(person, index) in persons">
                <td>{{index + 1}}.</td>
                <td>{{person.name}}</td>
                <td>{{person.score}}</td>
            </tr>
            </tbody>
        </table>
        <p v-else>Bisher keine Highscores vorhanden</p>
    </div>
</template>

<script>
  export default {
    name: 'Leaderboard',
    created () {
      let leaderboard = localStorage.getItem('leaderboard')
      let persons = leaderboard !== null ? JSON.parse(leaderboard) : []

      // sort by score
      this.persons = persons.sort(function (a, b) {
        return Number(b.score) - Number(a.score)
      })
    },
    data () {
      return {
        'persons': []
      }
    }
  }
</script>

<style scoped>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th {
        text-align: left;
        font-weight: 400;
    }

    th,td {
        padding: 10px;
        -ms-word-break: break-all;
        word-break: break-all;
        word-break: break-word;
        -webkit-hyphens: auto;
        -moz-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
    }

    tbody tr:nth-child(odd) {
        background-color: #fafafa;

    }

    thead tr {
        background-color: #6495ed;
        color: #ffffff;
    }
    p {
        text-align: center;
    }
    a {
        color: #6495ed;
    }
    a img {
        height: 20px;
    }
</style>
