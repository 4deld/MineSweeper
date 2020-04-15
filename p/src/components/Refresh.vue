<template>
  <div class="re">
        <img src="../assets/logo.png" alt="" class="image" @click="refresh">
  </div>
</template>

<script>
import { GameStart } from '../store/index';
export default {
    methods:{
        refresh(){
            this.$store.commit(GameStart, { 
            row: this.$store.state.data.row,
            col: this.$store.state.data.col, 
            mine: this.$store.state.data.mine,
            });
        }
    }
}
</script>

<style>
  .image{
    width:50px;
    cursor: pointer;
  }
  .re{
      display: flex;
  }
</style>