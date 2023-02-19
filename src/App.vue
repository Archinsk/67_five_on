<template>
  <div id="app">
    <div class="fw-bold">Игра Five-On</div>
    <div id="statusBar" :class="{ 'bg-success': gameStatus === 'Победа!' }">
      <div class="d-flex justify-content-between">
        <div>Состояние игры</div>
        <div>{{ gameStatus }}</div>
      </div>
      <div class="d-flex justify-content-between">
        <div>Сделано ходов</div>
        <div>{{ steps }}</div>
      </div>
    </div>
    <button id="restartButton" class="btn btn-warning" @click="initGame">
      Старт
    </button>
    <div id="gameButtons">
      <button
        v-for="btnNumber of buttons"
        :key="btnNumber"
        class="btn btn-primary gm-button"
        @click="clickGameButton(btnNumber)"
      >
        {{ btnNumber }}
      </button>
    </div>
    <div id="gameLeds" class="d-flex">
      <div
        v-for="led of leds"
        :key="led"
        :class="['led', { 'bg-danger': ledsOn[led - 1] }]"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      gameStatus: "Неактивна",
      steps: null,
      buttons: 5,
      buttonsTargets: [],
      leds: 5,
      ledsOn: [false, false, false, false, false],
    };
  },
  methods: {
    initGame() {
      this.gameStatus = "Активна";
      this.steps = 0;
      this.buttonsTargets = [];
      this.ledsOn = [false, false, false, false, false];
      this.setLedsForButtons();
    },
    setLedsForButtons() {
      for (let i = 0; i < this.buttons; i++) {
        let additionalLeds = this.getRandomAdditionalLeds();
        let oneButtonLeds = this.setLedsForOneButton(i, additionalLeds);
        this.buttonsTargets.push(oneButtonLeds);
      }
      console.log(this.buttonsTargets);
    },
    getRandomAdditionalLeds() {
      return Math.round(Math.random() * 3);
    },
    setLedsForOneButton(i, additionalLeds) {
      let ledsForOneButton = [i + 1, 0, 0, 0];
      for (let i = 1; i < additionalLeds + 1; ) {
        let randomLedNumber = this.getRandomLedNumber();
        let ledAlreadyInArr = this.checkLedNumberInLedsArray(
          randomLedNumber,
          ledsForOneButton
        );
        if (!ledAlreadyInArr) {
          ledsForOneButton[i] = randomLedNumber;
          i++;
        }
      }
      return ledsForOneButton;
    },
    getRandomLedNumber() {
      return Math.round(Math.random() * 4);
    },
    checkLedNumberInLedsArray(ledNumber, ledsArray) {
      return ledsArray.includes(ledNumber);
    },
    clickGameButton(btnNumber) {
      for (let i = 0; i < this.buttonsTargets[btnNumber - 1].length; i++) {
        if (this.buttonsTargets[btnNumber - 1][i]) {
          this.ledsOn[this.buttonsTargets[btnNumber - 1][i] - 1] =
            !this.ledsOn[this.buttonsTargets[btnNumber - 1][i] - 1];
        }
      }
      this.steps++;
      this.checkWin();
    },
    checkWin() {
      if (!this.ledsOn.includes(false)) {
        this.gameStatus = "Победа!";
      }
    },
  },

  mounted() {
    this.initGame();
  },
};
</script>
