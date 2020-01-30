<template>
  <div>
     세로 길이<input type="number" :value="row" @change="ChangeRow" /> <!--지역변수를 바꿈 -->
    가로 길이<input type="number" :value="col" @change="ChangeCol" /> <!--지역변수를 바꿈 -->
    지뢰 개수<input type="number" :value="mine" @change="ChangeMine" /> <!--지역변수를 바꿈 -->
  </div>
</template>

<script>
  import { GameStart } from '../store/index';

  export default {
    data() {
      return {
        row: 10,
        col: 10,
        mine: 20,
      };
    },
    methods: {
        //바뀐 지역변수를 vuex에 전송
     ChangeRow(e) {
        this.row = e.target.value;
      },
      ChangeCell(e) {
        this.col = e.target.value;
      },
      ChangeMine(e) {
        this.mine = e.target.value;
      },
      ClickBtn() {
        this.$store.commit(GameStart, { 
            row: this.row, 
            col: this.col, 
            mine: this.mine 
            });
      }
    },
  }
</script>
