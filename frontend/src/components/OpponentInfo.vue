<template>
  <div class="opponentflexbox">
    <div class="opponentword">OPPONENT</div>
    <div class="opelementsrow">
      <div id="opponentcnt">{{ OpponentMineCount }}</div>
      <img src="../assets/logo.png" class="logoimg" alt />
      <div id="opponenttimer">{{ Timer }}</div>
    </div>
    <div>
      <Table />
    </div>
  </div>
</template>

<script>
//mapState 사용
import { mapState } from "vuex";
import store, { Timer } from "../store/index";
import Table from "../components/Table";
import MineForm from "../components/MineForm";
import Refresh from "../components/Refresh";
import { GameStart } from "../store/index";
let interval;
export default {
  store,
  components: {
    Table,
    MineForm,
    Refresh,
  },
  data() {
    return {
      OpponentMineCount: 0,
    };
  },
  created() {
    this.$store.commit(GameStart, {
      row: this.$store.state.data.row,
      col: this.$store.state.data.col,
      mine: this.$store.state.data.mine,
    });
    this.$socket.on("OpponentInfo", (data) => {
      this.OpponentMineCount = data.Minecount;
    });
  },
  computed: {
    //mapped computed 속성의 이름이 상태 하위 트리이름과 동일할
    //경우 문자열 배열을 mapState로 넘길 수 있다
    ...mapState(["Timer", "result", "halted"]),
  },
  watch: {
    halted(value, oldvalue) {
      //게임시작
      if (value === false) {
        interval = setInterval(() => {
          this.$store.commit(Timer);
        }, 1000);
      }
      //중단
      else {
        clearInterval(interval);
      }
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
.opelementsrow {
  display: flex;
  flex-direction: row;
}

.opponentflexbox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: -20vw;
  top: 16vh;
}

.logoimg {
  width: 50px;
}
#opponentcnt,
#opponenttimer {
  margin: 10px;
}
.opponentword {
  margin: 10px;
}
</style>
