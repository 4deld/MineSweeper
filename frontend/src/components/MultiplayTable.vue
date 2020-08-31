<template>
  <table>
    <tr v-for="(rowData, rowidx) in tabledata" :key="rowidx">
      <td
        v-for="(colData, colidx) in rowData"
        :key="colidx"
        :style="DataStyle(rowidx, colidx)"
        @click="ClickTd(rowidx, colidx)"
        @contextmenu.prevent="RightClickTd(rowidx, colidx)"
      >
        <!-- contextmenu - 오른쪽 클릭 -->
        {{ DataText(rowidx, colidx) }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";
import {
  MineSpace,
  CODE,
  FlagSpace,
  NormalSpace,
  OpenSpace,
  QuestionSpace,
} from "../store/index";
export default {
  data() {
    return {};
  },
  created() {
    this.$socket.on("GAMESTART", () => {
      this.$socket.emit("MyInfo", {
        tabledata: this.tabledata,
        Minecount: this.$store.state.Minecount,
      });
    });
  },
  computed: {
    ...mapState(["tabledata", "halted"]),
    //코드를 검사해서 코드마다 스타일을 다르게 적용

    DataStyle(state) {
      return (row, col) => {
        switch (this.$store.state.tabledata[row][col]) {
          case CODE.Normal:
          case CODE.Mine:
            return {
              background: "#6C2DC7",
              font: "bold 25px serif",
            };
          case CODE.ClickMine:
          case CODE.Open:
            return {
              //background: 'white',
              font: "bold 25px serif",
            };
          case CODE.Flag:
          case CODE.FlagOnMine:
            return {
              //background: "red",
              font: "bold 25px serif",
            };
          case CODE.Question:
          case CODE.QuestionOnMine:
            return {
              //background: "yellow",
              font: "bold 25px serif",
            };
          case 1:
            return {
              color: "lightblue",
              font: "bold 25px serif",
            };
          case 2:
            return {
              color: "lightgreen",
              font: "bold 25px serif",
            };
          case 3:
            return {
              color: "lightcoral",
              font: "bold 25px serif",
            };
          case 4:
            return {
              color: "plum",
              font: "bold 25px serif",
            };
          case 5:
            return {
              color: "lightpink",
              font: "bold 25px serif",
            };
          case 6:
            return {
              color: "orange",
              font: "bold 25px serif",
            };
          case 7:
            return {
              color: "gold",
              font: "bold 25px serif",
            };
          case 8:
            return {
              color: "lightseagreen",
              font: "bold 25px serif",
            };

          default:
            return {};
        }
      };
    },
    DataText() {
      return (row, col) => {
        switch (this.$store.state.tabledata[row][col]) {
          case CODE.Mine:
            return "";
          case CODE.Normal:
            return "";
          case CODE.FlagOnMine:
          case CODE.Flag:
            return "!";
          case CODE.QuestionOnMine:
          case CODE.Question:
            return "?";
          case CODE.ClickMine:
            return "*";
          default:
            return this.$store.state.tabledata[row][col] || ""; //0이면 빈칸이 됨
        }
      };
    },
  },
  methods: {
    ClickTd(row, col) {
      if (this.halted && this.$store.state.Firstclick) {
        return;
      }
      //지뢰 밟기와 일반 칸 밟기 나눔
      this.$store.state.Firstclick = true;
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
      if (this.halted && this.$store.state.Firstclick) {
        return;
      }
      this.$store.state.Firstclick = true;
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
    },
  },
  watch: {
    tabledata: {
      // This will let Vue know to look inside the array
      deep: true,

      //immediate: true,

      // We have to move our method to a handler field
      handler(tabledata) {
        this.$socket.emit("MyInfo", {
          tabledata: this.tabledata,
          Minecount: this.$store.state.Minecount,
        });
      },
    },
  },
};
</script>

<style></style>
