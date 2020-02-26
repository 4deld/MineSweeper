<template>
  <div id="layout">
    <!--  COL <input type="number" :value="col" @change="ChangeCol" /> -->     
    <!--  ROW <input type="number" :value="row" @change="ChangeRow" />  -->
    <!--  MINE <input type="number" :value="mine" @change="ChangeMine" />  -->
    <button @click="ClickBtn" id="btn">시작</button>
  </div>
</template>

<script>
  import { GameStart } from '../store/index';

  export default {
    data() {
      return {
        row: 14,
        col: 18,
        mine: 40,
      };
    },
    methods: {
        //바뀐 지역변수를 vuex에 전송
     ChangeRow(e) {
        this.row = e.target.value;
      },
      ChangeCol(e) {
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

<style>
#btn{
  background-color: black;
  color: white;
  border-radius: 10px;
}
#layout{
  display: flex;
  justify-content: center;
}

</style>
