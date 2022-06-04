<template>
  <main>
    <div class="container">
      <div class="main-wrapper">
        <div class="welcome_text text-center">
          <h2>Hala Madrid ! in the Past , Now , Futur , Foreaver...</h2>
          <div v-if="!EndedQuiz">
            <h4 class="mt-4">
              Take RMA Quiz and Show us your Score, So Are you really
              Madridista?
            </h4>
            <router-link to="/madridista-quiz" class="btn mt-3 btn-lg">
              Take Quiz
            </router-link>
          </div>
          <div v-else>
            <h4 class="mt-4">Be proud of who you are, Madridista</h4>
            <router-link to="/madridista-quiz" class="btn mt-3 btn-lg">
              See Your Result
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      Ended: this.$cookies.get("ended"),
    };
  },
  computed: {
    EndedQuiz() {
      return Boolean(this.Ended);
    },
  },
};
</script>

<style></style>
