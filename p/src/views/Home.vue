<template>
<!-- git config --global core.autocrlf true -->
  <div class="homelayout">
    <div class="home">
     <MineForm />
     <div class="flex">
     <div id="cnt">{{Minecount}}</div>
    <div id="timer">{{Timer}}</div>
    </div>
    <Table />
    </div>
    <div class="res">
      {{result}}
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
let interval;
export default {
  store,
  components:{
    Table,
    MineForm, 
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
}
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
  .home{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #timer, #cnt{
    margin: 10px;
    font-size: 2em;
  }
  .flex{
    display: flex;
    align-items:center;
  }
  .res{
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 3em;
    right: 5vw;
    top: 1vh;
  }
  .homelayout{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:center;
  }
</style>
