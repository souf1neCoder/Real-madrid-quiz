<template>
  <Nav />
  <main>
    <div class="container">
      <div class="main-wrapper">
        <div class="quiz-wrapper">
          <div v-if="!EndedQuiz">
            <div v-if="quizStart">
              <div class="quiz" v-if="!quizCompleted">
               <div class="progress_bar">
                 <div class="bar" ref="bar"></div>
               </div>
                <h2 class="text-center mb-3">{{ getCurrentQuestion.q }}</h2>
                <div class="options">
                  <div
                    @click="addActiveToRadio(i)"
                    class="form-check"
                    v-for="(option, i) in getCurrentQuestion.options"
                    :key="i"
                  >
                    <input
                      @change="onChangeOption"
                      :id="'radio' + i"
                      class="form-check-input"
                      name="option"
                      type="radio"
                      :value="option"
                    />
                    <label :for="'radio' + i" class="form-check-label">{{
                      option
                    }}</label>
                  </div>
                </div>
                <button
                  class="nextBtn mx-auto d-block"
                  :disabled="checkedOn"
                  @click="nextQuestion"
                >
                  Next
                </button>
              </div>
              <div v-else class="text-center">
                <h2 class="finish-text mb-3">You have finished the Quiz!</h2>
                <p class="result mb-3">
                  Your Score is <span>{{ getScore }}</span
                  >/<span>{{ quiz.length }}</span>
                </p>
                <button class="btn-dark btn" @click="back">Back</button>
              </div>
            </div>
            <div v-else>
              <button class="startBtn mx-auto d-block" @click="startQuiz">
                Start Quiz
              </button>
            </div>
          </div>
          <div v-else class="text-center">
            <h2 class="finish-text mb-3">
              You have already finished the Quiz!
            </h2>
            <p class="result mb-3">
              Your Score is <span>{{ getScoreCook }}</span
              >/<span>{{ quiz.length }}</span>
            </p>
            <button class="btn-dark btn" @click="back">Back</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Nav from "@/components/Nav.vue";

import { onSnapshot, query,orderBy } from "firebase/firestore";
import { colRef } from "@/firebase.js";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      quiz: [],
      currentQuestion: 0,
      quizCompleted: false,
      quizStart: false,
      checkedOption: "",
      widthBar:8.33,
      audio: new Audio(),
      Ended: this.$cookies.get("ended"),
    };
  },
  methods: {
    // Valid Answer
    nextQuestion() {
      // check if quiz is ended
      if (
        this.getCurrentQuestion.index ===
        this.$store.getters.getQuestions.length
      ) {
        this.$cookies.set("ended", "true");
        this.audio.src = require("@/assets/music/rma.mp3");
        this.audio.play();
      }
      // increment score if answer correct
      this.getCurrentQuestion.answer === this.checkedOption
        ? this.$store.dispatch("incrementScore")
        : "";
      this.$cookies.set("score", this.$store.getters.getScore);
      this.currentQuestion < this.quiz.length - 1
        ? this.currentQuestion++
        : (this.quizCompleted = true);
        // Initialize values
      this.checkedOption = "";
      this.setCheckedsFalse();
      let formsCheck = document.querySelectorAll(".form-check");
      formsCheck.forEach((radio) => {
        radio.classList.remove("active");
      });
      // Progress bar 
      let bar = this.$refs.bar;
      
       bar.style.width = `${this.widthBar}%`;
      this.widthBar += 8.33
     
    },
    // get Checked Option value
    onChangeOption(e) {
      this.checkedOption = e.target.value;
    },
    // Inialize value of radios to false
    setCheckedsFalse() {
      let radios = document.querySelectorAll("input[type=radio]");
      radios.forEach((radio) => {
        radio.checked = false;
      });
    },
    // add background to radio checked
    addActiveToRadio(i) {
      let formsCheck = document.querySelectorAll(".form-check");

      formsCheck.forEach((radio) => {
        radio.classList.remove("active");
      });
      formsCheck[i].classList.add("active");
    },
    // open quiz
    startQuiz() {
      this.quizStart = !this.quizStart;
      this.$store.state.score = 0;
    },
    // Button return
    back() {
   
      !this.audio.paused ? this.audio.pause() : '';
      this.$store.dispatch("ClearStore");
      this.$router.push("/");
    },
  },

  created() {
    // Get Questions
    const q = query(colRef, orderBy("index"));

    onSnapshot(q, (querySnapshot) => {
      this.$store.dispatch("ClearStore");
      querySnapshot.docs.forEach((doc) => {
        this.$store.dispatch("setQuestions", { ...doc.data() });
      });
      this.quiz = this.$store.getters.getQuestions;
    });
  },
  computed: {
    getCurrentQuestion() {
      return this.quiz[this.currentQuestion];
    },
    checkedOn() {
      return this.checkedOption !== "" ? false : true;
    },
    getScore() {
      return this.$store.getters.getScore;
    },
    EndedQuiz() {
      return Boolean(this.Ended);
    },
    getScoreCook() {
      return this.$cookies.get("score");
    },
  },
};
</script>


