<template>
  <div id="layout">
    <div class="buttoncolumn">
      <button @click="ClickBtnGreeny" class="btn">beginner</button>
      <button @click="ClickBtnAmateur" class="btn">Amateur</button>
      <button @click="ClickBtnProfessional" class="btn">Professional</button>
      <button @click="ClickBtnCustom" class="btn">custom</button>
      <div id="custom_mode" v-if="localchangemode">
        <div class="custombox">
          COL <input type="number" :value="col" @change="ChangeCol" />
        </div>
        <div class="custombox">
          ROW <input type="number" :value="row" @change="ChangeRow" />
        </div>
        <div class="custombox">
          MINE <input type="number" :value="mine" @change="ChangeMine" />
        </div>
        <div>
          <button @click="ClickBtnCustom" class="btn">update</button>
        </div>
      </div>
      <button @click="Multiplay" class="btn">Multiplay</button>
    </div>
  </div>
</template>

<script>
import { GameStart } from "../store/index";

export default {
  data() {
    return {
      row: 14,
      col: 18,
      mine: 40,
      localchangemode: 0,
    };
  },
  methods: {
    ChangeRow(e) {
      this.row = e.target.value;
    },
    ChangeCol(e) {
      this.col = e.target.value;
    },
    ChangeMine(e) {
      this.mine = e.target.value;
    },
    Set(row, col, mine) {
      this.row = row;
      this.col = col;
      this.mine = mine;
    },
    //바뀐 지역변수를 vuex에 전송
    ClickBtnGreeny() {
      this.Set(9, 9, 10);
      this.$store.commit(GameStart, {
        row: this.row,
        col: this.col,
        mine: this.mine,
      });
      this.localchangemode = 0;
      this.$store.state.Firstclick = false;
    },
    ClickBtnAmateur() {
      this.Set(16, 16, 40);
      this.$store.commit(GameStart, {
        row: this.row,
        col: this.col,
        mine: this.mine,
      });
      this.localchangemode = 0;
      this.$store.state.Firstclick = false;
    },
    ClickBtnProfessional() {
      this.Set(16, 30, 99);
      this.$store.commit(GameStart, {
        row: this.row,
        col: this.col,
        mine: this.mine,
      });
      this.localchangemode = 0;
      this.$store.state.Firstclick = false;
    },
    ClickBtnCustom() {
      this.$store.commit(GameStart, {
        row: this.row,
        col: this.col,
        mine: this.mine,
      });
      this.localchangemode = 1;
      this.$store.state.Firstclick = false;
    },
    Multiplay() {
      this.$router.push("multiplay");
    },
  },
  watch: {
    row() {
      if (this.mine > this.col * this.row - 1 || this.row < 1) {
        this.row = 10;
      }
    },
    col() {
      if (this.mine > this.col * this.row - 1 || this.col < 1) {
        this.col = 10;
      }
    },
    mine() {
      if (this.mine > this.col * this.row - 1 || this.mine < 1) {
        this.mine = 9;
      }
    },
  },
};
</script>

<style>
.btn {
  background: white;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  width: 200px;
  margin-top: 8px;
  color: #8b8c8d;
  cursor: pointer;
  border: 1px solid #dddedf;
  text-transform: uppercase;
  transition: 0.1s all;
  font-size: 20px;
}
.btn:hover {
  border-color: black;
  color: black;
}

#layout button {
  margin: 0 10px;
}

#layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 5vw;
  font-size: 30px;
}

#custom_mode {
  margin: 10px 0;
  font-size: 23px;
  display: flex;
  flex-direction: column;
}

.buttoncolumn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
}
.custombox {
  margin: 10px;
}
</style>
