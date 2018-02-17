<template>
    <div class="quiz">
        <small v-if="questionIndex < userResponses.length">Frage {{questionIndex + 1}} von {{userResponses.length}}
        </small>
        <div v-for="(question, qIndex) in questionData" class="question" v-show="qIndex === questionIndex">
            <div v-html="question.text" :class="'question-text ' + answeredCorrect(qIndex)"></div>
            <div :class="'responses ' + (isDisabled(qIndex) ? 'answered' : 'not-answered')">
                <div v-for="(response, rIndex) in question.responses" class="response">
                    <input :disabled="isDisabled(qIndex) ? 'disabled' : null" type="radio"
                           @click="answer(response, qIndex, rIndex)" :id="'response' + qIndex + rIndex"
                           :name="'response' + qIndex"/>
                    <label :for="'response' + qIndex + rIndex"
                           :class="isDisabled(qIndex) && response.correct === true ? 'correct' : null">
                        <span class="label-inner">
                            {{response.text}}
                        </span>
                    </label>
                </div>
            </div>

        </div>
        <div v-if="questionIndex === userResponses.length" class="result">
            <p>{{score()}} von {{userResponses.length}} Fragen korrekt beantwortet</p>
            <registration :score="score()"></registration>
        </div>
        <div v-else class="control-buttons">
            <button class="btn-prev" v-show="questionIndex !== 0" @click="previousQuestion()">Vorherige Frage</button>
            <button class="btn-next" v-show="isDisabled(questionIndex) && !isLastQuestion()" @click="nextQuestion()">
                Nächste Frage
            </button>
            <button class="btn-finish" v-show="isLastQuestion() && isDisabled(questionIndex)" @click="nextQuestion()">
                Abschließen
            </button>
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
    @font-face {
        font-family: permanent-marker;
        src: url(/static/files/PermanentMarker-Regular.ttf);
    }

    input {
        display: none;
    }

    label {
        height: 180px;
        font-weight: 400;
        background-color: #ffffdd;
        -webkit-box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 6px 0;
        -moz-box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 6px 0;
        box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 6px 0;
        position: relative;
        display: block;
        padding: 15px;
        -webkit-transition: all 250ms ease-in-out;
        -moz-transition: all 250ms ease-in-out;
        -ms-transition: all 250ms ease-in-out;
        -o-transition: all 250ms ease-in-out;
        transition: all 250ms ease-in-out;
        cursor: pointer;
        outline: 2px solid transparent;
    }

    label .label-inner {
        position: absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        font-family: permanent-marker, "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-shadow: 1px 2px rgba(0,0,0,0.1);
    }

    .responses:not(.answered) label:hover:before, .responses:not(.answered) label:active:before, input:checked + label:before {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        left: 0;
        top: 0;
        border-top: 40px solid #ffffff;
        border-right: 40px solid #f4f4d3;
        -webkit-box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
        box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
    }

    .responses:not(.answered) label:hover, input:checked + label {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
    }

    .responses:not(.answered) label:active {
        -webkit-transform: scale(1.025);
        -moz-transform: scale(1.025);
        -ms-transform: scale(1.025);
        -o-transform: scale(1.025);
        transform: scale(1.025);
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
        color: #e94235;
    }

    .responses.answered .response label.correct {
        color: #34a953;
    }

    .responses.answered .response input:checked + label {
        color: #e94235;
    }

    .responses.answered .response input:checked + label.correct {
        color: #34a953;
    }

    .response {
        padding: 15px 22px;
        width: 50%;
        float: left;
    }

    button {
        position: relative;
        font-weight: 400;
        margin: 15px 0;
        width: calc(50% - 20px);
        padding: 18px;
    }

    button:hover {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
    }

    button:active {
        -webkit-transform: scale(1.025);
        -moz-transform: scale(1.025);
        -ms-transform: scale(1.025);
        -o-transform: scale(1.025);
        transform: scale(1.025);
    }

    button:not(:first-of-type) {
        float: right;
    }

    .btn-prev:before {
        content: url(/static/files/arrow-left.svg);
        position: absolute;
        width: 11px;
        left: 15px;
    }

    .btn-next:before {
        content: url(/static/files/arrow-right.svg);
        position: absolute;
        width: 11px;
        right: 15px;
    }

    .question-text {
        background-color: #ffffdd;
        font-family: Georgia, "Arial", serif;
        margin: 25px 0 15px;
        -webkit-box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 6px 0;
        -moz-box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 6px 0;
        box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 6px 0;
        text-shadow: 1px 2px rgba(0,0,0,0.1);
        padding: 20px;
    }

    .question-text.correct {
        color: #34a953;
    }

    .question-text.not-correct {
        color: #e94235;
    }

</style>
