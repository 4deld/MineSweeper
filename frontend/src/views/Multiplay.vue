<template>
<!-- git config --global core.autocrlf true -->
  <!-- <div v-if="username()">

  </div> -->
  <div class="homelayout">
    <div class="left">
      <button class="lefttop btnx">방 만들기</button>
      <button class="leftbottom btnx" @click="Single()">싱글플레이</button>
    </div>
    <div class="center">CENTER</div>
    <div class="right">
      <div class="righttop">채팅</div>
      <div class="rightbox">채팅칸</div>
    </div>
  </div>
</template>

<script>
//mapState 사용
import { mapState } from 'vuex';
import store, { Timer } from '../store/index';
import {Minecount} from '../store/index';
import Table from '../components/Table';
import MineForm from '../components/MineForm';
import Refresh from '../components/Refresh'
import { GameStart } from '../store/index';
let interval;
export default {
  store,
  components:{
    Table,
    MineForm, 
    Refresh
  },
  created(){
    this.$store.commit(GameStart, { 
            row: this.$store.state.data.row,
            col: this.$store.state.data.col, 
            mine: this.$store.state.data.mine,
            });
  },
  computed: {
    //mapped computed 속성의 이름이 상태 하위 트리이름과 동일할 
    //경우 문자열 배열을 mapState로 넘길 수 있다
      ...mapState(['Timer', 'result', 'halted','Minecount']),
    },
    watch:{
      halted(value, oldvalue){
        //게임시작
        if(value===false){
          interval = setInterval(() => {
            this.$store.commit(Timer);
          },1000)
        }
        //중단
        else{
          clearInterval(interval)
        }
      }
    },
    methods:{
      Single(){
        this.$router.push('/')
      }
    }
}
</script>


<style scoped>
  .homelayout{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    height: 100vh;
  }
  .left{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    width: 25vw;
  }
  .right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }
  .righttop{
    width: 100px;
    height: 100px;
  }
  .rightbox{
    width: 100px;
    height: 100px;
  }
  .btnx{
  background-color: black;
  color: white;
  font-size: 25px;
  border: 0;
  cursor: pointer;
  padding: 0;
  width: fit-content;
  padding: 10px;
}

</style>
