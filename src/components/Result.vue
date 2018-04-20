<template>
    <div class="result">
        <h1>{{resultText()}}</h1>
    </div>
</template>

<script>
  export default {
    name: 'Result',
    props: [
      'score',
      'scores',
      'texts'
    ],
    data () {
      return {
        'text': null
      }
    },
    methods: {
      resultText: function () {
        let textObject
        let scoreObject = this.scores.find(score => score.score === Number(this.score))

        if (scoreObject !== undefined) {
          textObject = this.texts.find(text => text.id === scoreObject.textId)
          if (textObject !== undefined) {
            return textObject.text
          }
        }

        return this.texts.sort(function () { return 0.5 - Math.random() })[0].text
      }
    }
  }
</script>

