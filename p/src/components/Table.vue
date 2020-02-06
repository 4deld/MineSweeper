<template>
  <table>
      <tr v-for="(rowData, rowidx) in tabledata" :key="rowidx">
          <td
        v-for="(colData, colidx) in rowData"
        :key="colidx"
        :style="colDataStyle(rowidx, colidx)"
        @click="ClickTd(rowidx, colidx)"
        @contextmenu.prevent="RightClickTd(rowidx, colidx)" 
      >
      <!-- contextmenu - 오른쪽 클릭 -->
              {{colDataText(rowidx,colidx)}}
          </td>
      </tr>
  </table>
</template>

<script>
import { mapState } from 'vuex'
import { MineSpace , CODE, FlagSpace , NormalSpace , OpenSpace , QuestionSpace  } from '../store/index';
export default {
    computed:{
        ...mapState(['tabledata','halted']),
        //코드를 검사해서 코드마다 스타일을 다르게 적용
        colDataStyle(state) {
        return (row, col) => {
          switch (this.$store.state.tabledata[row][col]) {
            case CODE.Normal:
            case CODE.Mine:
              return {
                background: '#444',
              };
            case CODE.ClickMine:
            case CODE.Open:
              return {
                background: 'white',
              };
            case CODE.Flag:
            case CODE.FlagOnMine:
              return {
                background: 'red',
              };
            case CODE.Question:
            case CODE.QuestionOnMine:
              return {
                background: 'yellow',
              };
            default:
              return {};
          }
        };
      },
      colDataText() {
        return (row, col) => {
          switch (this.$store.state.tabledata[row][col]) {
            case CODE.Mine:
              return 'X';
            case CODE.Normal:
              return '';
            case CODE.FlagOnMine:
            case CODE.Flag:
              return '!';
            case CODE.QuestionOnMine:
            case CODE.Question:
              return '?';
            case CODE.ClickMine:
              return '펑';
            default:
              return this.$store.state.tabledata[row][col] || '';
          }
        };
      },
    },
methods: {
      ClickTd(row, col) {
        if (this.halted) {
          return;
        }
        //지뢰 밟기와 일반 칸 밟기 나눔
        switch (this.tabledata[row][col]) {
          case CODE.Normal:
            return this.$store.commit(OpenSpace, { row, col });
          case CODE.Mine:
            return this.$store.commit(MineSpace, { row, col });
          default:
            return;
        }
      },
      RightClickTd(row, col) {
        if (this.halted) {
          return;
        }
        console.log(row, col);
        switch (this.tabledata[row][col]) {
          case CODE.Normal:
          case CODE.Mine:
            this.$store.commit(FlagSpace, { row, col });
            return;
          case CODE.FlagOnMine:
          case CODE.Flag:
            this.$store.commit(QuestionSpace, { row, col });
            return;
          case CODE.QuestionOnMine:
          case CODE.Question:
            this.$store.commit(NormalSpace, { row, col });
            return;
          default:
            return;
        }
      }
    }
  };

</script>

<style>

</style>