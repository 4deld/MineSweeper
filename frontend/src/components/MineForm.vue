<template>
  <div id="layout">
    <div>
      <button @click="ClickBtnGreeny" class="btn">초보자</button>
      <button @click="ClickBtnAmateur" class="btn">아마추어</button>
      <button @click="ClickBtnProfessional" class="btn">프로페셔널</button>
      <button @click="ClickBtnCustom" class="btn">커스텀</button>
      <button @click="Multiplay" class="btn">멀티플레이</button>
    </div>
    <div id="custom_mode" v-if="localchangemode">
      COL <input type="number" :value="col" @change="ChangeCol" /> ROW
      <input type="number" :value="row" @change="ChangeRow" /> MINE
      <input type="number" :value="mine" @change="ChangeMine" />
      <button @click="ClickBtnCustom" class="btn">업데이트</button>
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
  background-color: black;
  color: white;
  font-size: 25px;
  border: 0;
  cursor: pointer;
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
  font-size: 25px;
}
</style>
