<template>
    <div class="quiz">
        <div v-for="(question, qIndex) in questionData" class="question" v-show="qIndex === questionIndex">
            <div class="background-image" :style="'background-image:url(static/files/' + question.bg_image + ');'"></div>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <div class="row">
                    <div class="col-xs-12">
                        <div :class="'question-panel question-text ' + answeredCorrect(qIndex)"><span>{{question.text}}</span></div>
                    </div>
                    <div class="col-xs-12">
                        <img class="map" :src="'static/files/dialektkarte_' + question.category + '.svg'" alt="">
                    </div>
                    <div class="col-xs-12">
                        <div class="question-panel" v-show="!isDisabled(questionIndex)"><span>Frage {{questionIndex + 1}} von {{userResponses.length}}</span></div>
                        <div class="question-panel c-pointer btn-click" v-show="isDisabled(questionIndex) && !isLastQuestion()" @click="nextQuestion()"><span>Nächste Frage</span></div>
                        <div class="question-panel c-pointer btn-click" v-show="isLastQuestion() && isDisabled(questionIndex)" @click="nextQuestion()"><span>Abschließen</span></div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6">
                <div :class="'responses ' + (isDisabled(qIndex) ? 'answered' : 'not-answered')">
                    <div v-for="(response, rIndex) in question.responses" class="response">
                        <input :disabled="isDisabled(qIndex) ? 'disabled' : null" type="radio"
                               @click="answer(response, qIndex, rIndex)" :id="'response' + qIndex + rIndex"
                               :name="'response' + qIndex"/>
                        <label :style="randomLabel()" :for="'response' + qIndex + rIndex"
                               :class="isDisabled(qIndex) && response.correct === true ? 'correct' : null">
                        <span class="label-inner">
                            {{response.text}}
                        </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div v-if="questionIndex === userResponses.length" class="result">
        <result :score="score()" :scores="scores" :texts="texts"></result>
        <p>{{score()}} von {{userResponses.length}} Fragen korrekt beantwortet</p>
        <a @click="reload()">Neues Spiel</a>
    </div>
    </div>
</template>

<script>
    import Result from '../components/Result'
    import questionData from '../assets/question'

    export default {
        name: 'Quiz',
        components: {
            'result': Result
        },
        data () {
            return {
                questionData: questionData.questions.sort(function () { return 0.5 - Math.random() }),
                scores: questionData.evaluations.scores,
                texts: questionData.evaluations.texts,
                questionIndex: 0,
                userResponses: Array(questionData.questions.length).fill(false)
            }
        },
        methods: {
            nextQuestion: function () {
                this.questionIndex++
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
            randomLabel: function () {
                let rand = Math.random()
                let degrees = (Math.floor(Math.random() * 10) - 1.5) * (rand > 0.5 ? -1 : 1)
                return 'transform: rotate(' + degrees + 'deg);'
            },
            answeredCorrect: function (qIndex) {
                if (this.isDisabled(qIndex)) {
                    if (this.userResponses[qIndex] === 'r01') {
                        return 'correct'
                    }
                    return 'not-correct'
                }
                return null
            },
            reload () {
                location.reload()
            }
        }
    }
</script>

<style scoped>
    @font-face {
        font-family: permanent-marker;
        src: url(/static/files/Reklame-Script-Bold.otf);
    }

    input {
        display: none;
    }

    label {
        height: 180px;
        font-weight: 400;
        background-color: #fff9d7;
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
    }

    .responses:not(.answered) label:hover:before, .responses:not(.answered) label:active:before, input:checked + label:before {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        left: 0;
        top: 0;
        border-top: 40px solid transparent;
        border-right: 40px solid #fff9d7;
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
        clip-path: polygon(40px 0, 100% 0, 120% 120%, 0 120%, 0 40px);
    }

    .responses:not(.answered) label:active {
        -webkit-transform: scale(1.025);
        -moz-transform: scale(1.025);
        -ms-transform: scale(1.025);
        -o-transform: scale(1.025);
        transform: scale(1.025);
        clip-path: polygon(40px 0, 100% 0, 120% 120%, 0 120%, 0 40px);
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

    .question-panel {
        background-color: #fff9d7;
        min-height: 115px;
        font-family: Georgia, "Arial", serif;
        margin: 25px 0 15px;
        padding: 20px;
    }

    .question-text.correct {
        color: #34a953;
    }

    .question-text.not-correct {
        color: #e94235;
    }

    .question-panel span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        margin-top: -12.5px;
    }

    .c-pointer {
        cursor: pointer;
        -webkit-transition: all 250ms ease-in-out;
        -moz-transition: all 250ms ease-in-out;
        -ms-transition: all 250ms ease-in-out;
        -o-transition: all 250ms ease-in-out;
        transition: all 250ms ease-in-out;
    }
    .c-pointer:hover {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
    }

    .c-pointer:hover:before {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        left: 0;
        top: 0;
        border-top: 40px solid transparent;
        border-right: 40px solid #fff9d7;
        -webkit-box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
        box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.1);
    }

    .c-pointer:active {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
    }

    .map {
        max-height: 45vh;
    }

    .btn-click {
        text-align: center;
        animation: bounce 4s infinite;
    }

    .btn-click:hover,.btn-click:active {
        animation: none;
        clip-path: polygon(40px 0, 100% 0, 120% 120%, 0 120%, 0 40px);
    }

    @keyframes bounce {
        0% { transform: scale(1); }
        30% { transform: scale(1); }
        40% { transform: scale(1.08); }
        50% { transform: scale(1); }
        60% { transform: scale(1); }
        70% { transform: scale(1.05); }
        80% { transform: scale(1); }
        100% { transform: scale(1); }
    }

    .background-image {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-position: center;
        background-size: cover;
    }

    p {
        text-align: center;
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
