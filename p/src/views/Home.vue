<template>
  <div class="home">
     <MineForm />
    <div>{{timer}}</div>
    <Table />
    <div>{{result}}</div>
  </div>
</template>

<script>
//mapState 사용
import { mapState } from 'vuex';
 import store, { Timer } from '../store/index';
  import Table from '../components/Table';
import MineForm from '../components/MineForm';
export default {
  store,
  components:{
    Table,
    MineForm
  },
  computed: {
    //mapped computed 속성의 이름이 상태 하위 트리이름과 동일할 
    //경우 문자열 배열을 mapState로 넘길 수 있다
      ...mapState(['timer', 'result', 'halted']),
    },
}
</script>
