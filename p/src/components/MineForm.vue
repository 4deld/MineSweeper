<template>
  <div id="layout">
    <div>
    <button @click="ClickBtnGreeny" class="btn">초보자</button>
    <button @click="ClickBtnAmateur" class="btn">아마추어</button>
    <button @click="ClickBtnProfessional" class="btn">프로페셔널</button>
    <button @click="ClickBtnCustom" class="btn">커스텀</button>
    </div>
    <div id="custom_mode" v-if="localchangemode">
      COL <input type="number" :value="col" min="1" @change="ChangeCol" />    
      ROW <input type="number" :value="row" min="1" @change="ChangeRow" /> 
      MINE <input type="number" :value="mine" @change="ChangeMine" /> 
      <button @click="ClickBtnCustom" class="btn">업데이트</button>
     </div>
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
        localchangemode : 0,
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
      Set(row,col,mine){
        this.row=row;
        this.col=col;
        this.mine=mine;
      },
      ClickBtnGreeny() {
        this.Set(9,9,10)
        this.$store.commit(GameStart, { 
            row: this.row, 
            col: this.col, 
            mine: this.mine 
            });
        this.localchangemode = 0
        this.$store.state.Firstclick = false
      },
      ClickBtnAmateur() {
        this.Set(16,16,40)
        this.$store.commit(GameStart, { 
            row: this.row, 
            col: this.col, 
            mine: this.mine 
            });
            this.localchangemode = 0
            this.$store.state.Firstclick = false
      },
      ClickBtnProfessional() {
        this.Set(16,30,99)
        this.$store.commit(GameStart, { 
            row: this.row, 
            col: this.col, 
            mine: this.mine 
            });
            this.localchangemode = 0
            this.$store.state.Firstclick = false
      },
      ClickBtnCustom() {
        this.$store.commit(GameStart, { 
            row: this.row, 
            col: this.col, 
            mine: this.mine 
            });
            this.localchangemode = 1
            this.$store.state.Firstclick = false
      }
    },
  }
</script>

<style>
.btn{
  background-color: black;
  color: white;
  font-size: 25px;
  border: 0;
}

#layout button{
  margin: 0 10px;
}

#layout{
  display: flex;
  flex-direction: column;
  align-items: center;
}

input{
  width: 5vw;
  font-size: 30px;
}

#custom_mode{
  margin: 10px 0;
  font-size: 25px;
}

</style>
