<template>
    <div class="quiz">
        <small v-if="questionIndex < userResponses.length">Frage {{questionIndex + 1}} von {{userResponses.length}}</small>
        <div v-for="(question, qIndex) in questionData" class="question" v-show="qIndex === questionIndex">
            <div v-html="question.text" :class="'question-text ' + answeredCorrect(qIndex)"></div>
            <div :class="'responses ' + (isDisabled(qIndex) ? 'answered' : 'not-answered')">
                <div v-for="(response, rIndex) in question.responses" class="response">
                    <input :disabled="isDisabled(qIndex) ? 'disabled' : null" type="radio" @click="answer(response, qIndex, rIndex)" :id="'response' + qIndex + rIndex" :name="'response' + qIndex" />
                    <label :for="'response' + qIndex + rIndex" :class="isDisabled(qIndex) && response.correct === true ? 'correct' : null">
                        {{response.text}}
                    </label>
                </div>
            </div>

        </div>
        <div v-if="questionIndex === userResponses.length" class="result">
            <p>{{score()}} von {{userResponses.length}} Fragen korrekt beantwortet</p>
            <registration :score="score()"></registration>
        </div>
        <div v-else class="control-buttons">
            <button v-show="questionIndex !== 0" @click="previousQuestion()"><img src="/static/files/arrow-left.svg" alt="Vorherige Frage"></button>
            <button v-show="isDisabled(questionIndex) && !isLastQuestion()" @click="nextQuestion()"><img src="/static/files/arrow-right.svg" alt="Nächste Frage"></button>
            <button v-show="isLastQuestion() && isDisabled(questionIndex)" @click="nextQuestion()">Abschließen</button>
        </div>
    </div>
</template>

<script>
  import Registration from '../components/Registration'
  import questionData from '../assets/question'

  export default {
    name: 'Quiz',
    components: {
      'registration': Registration
    },
    data () {
      return {
        questionData: questionData,
        questionIndex: 0,
        userResponses: Array(questionData.length).fill(false)
      }
    },
    methods: {
      nextQuestion: function () {
        this.questionIndex++
      },
      previousQuestion: function () {
        this.questionIndex--
      },
      answer: function (response, qIndex, rIndex) {
        this.userResponses[qIndex] = response.correct ? 'r01' : 'r' + rIndex
        this.questionIndex++
        this.questionIndex--
      },
      isDisabled: function (qIndex) {
        return this.userResponses[qIndex] !== false
      },
      isLastQuestion: function () {
        return this.userResponses.length === this.questionIndex + 1
      },
      score: function () {
        return this.userResponses.filter(function (val) {
          return val === 'r01'
        }).length
      },
      answeredCorrect: function (qIndex) {
        if (this.isDisabled(qIndex)) {
          if (this.userResponses[qIndex] === 'r01') {
            return 'correct'
          }
          return 'not-correct'
        }
        return null
      }
    }
  }
</script>

<style scoped>
    input {
        display: none;
    }

    label {
        display: block;
        padding: 10px;
        -webkit-transition: all 250ms ease-in-out;
        -moz-transition: all 250ms ease-in-out;
        -ms-transition: all 250ms ease-in-out;
        -o-transition: all 250ms ease-in-out;
        transition: all 250ms ease-in-out;
        cursor: pointer;
        outline: 2px solid transparent;
    }

    label:hover,input:checked + label {
        background-color: #6495ed;
        color: #ffffff;
        outline-color: #6495ed;
    }

    input[disabled='disabled'] + label:hover {
        background-color: inherit;
        color: inherit;
    }

    input[disabled='disabled']:checked + label:hover {
        background-color: #6495ed;
        color: #ffffff;
    }

    input[disabled='disabled'] + label {
        cursor: not-allowed;
    }

    .responses {
        margin-right: -20px;
        margin-left: -20px;
    }

    .responses:before, .responses:after {
        display: table;
        content: " ";
        clear: both;
    }

    .responses.answered .response label {
        outline: 2px solid #dc143c;
        color: #dc143c;
    }

    .responses.answered .response label.correct{
        outline: 2px solid #228b22;
        color: #228b22;
    }

    .responses.answered .response input:checked + label {
        background-color: #dc143c;
        color: #ffffff;
    }
    .responses.answered .response input:checked + label.correct {
        background-color: #228b22;
        color: #ffffff;
    }

    .response {
        padding: 22px;
        width: 50%;
        float: left;
    }

    button {
        margin: 20px 0;
    }

    .question-text {
        margin: 20px 0;
    }

    .question-text.correct {
        color: #228b22;
    }

    .question-text.not-correct {
        color: #dc143c;
    }

    small {
        margin-top: 20px;
    }

    button img {
        height: 20px;
    }

</style>
