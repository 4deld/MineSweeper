import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const GameStart = 'GameStart'
export const OpenSpace = 'OpenSpace'
export const FlagSpace = 'FlagSpace'
export const MineSpace = 'MineSpace'
export const QuestionSpace = 'QuestionSpace'
export const NormalSpace = 'NormalSpace'
export const Timer = 'Timer'

export const CODE = {
  Mine: -7,
  Normal: -1,
  Question: -2,
  Flag: -3,
  QuestionOnMine: -4,
  FlagOnMine: -5,
  ClickMine: -6,
  Open: 0, // 0 이상이면 다 open (주변에 있는 지뢰의 수)
};

const MinePlanting = (row, col, mine) => {
  console.log(row, col, mine);
  const candidate = Array(row * col).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * col - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < col; j++) {
      rowData.push(CODE.Normal);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / col);
    const hor = shuffle[k] % col;
    data[ver][hor] = CODE.Mine;
  }

  console.log(data);
  return data;
};



export default new Vuex.Store({
  state: {
    tabledata: [],
    data: {
      row: 0, //가로
      col: 0, //세로
      mine: 0 //지뢰
    },
    Timer: 0,
    result: '',
    //아직 게임 시작 안했으니 halted는 true
    halted: true,

  },
  mutations: { //mutations 통해서 state에 접근

    [GameStart](state, { row, col, mine }) {
      state.data = {
        row,
        col,
        mine,
      };
      // state.data.row=row;
      // //Vue.set을 이용해서 객체 안에 속성이나 인덱스를 일치시켜준다
      // Vue.set(state.data,'row',row);
      state.tabledata = MinePlanting(row, col, mine)
      state.Timer = 0;
      state.halted = false;
    },
    [OpenSpace](state, { row, col }) {
      //vue.set을 사용
      Vue.set(state.tabledata[row], col, CODE.Open);
    },
    [FlagSpace](state, { row, col }) {
      if (state.tabledata[row][col] === CODE.Mine) {
        Vue.set(state.tabledata[row], col, CODE.FlagOnMine);
      }
      else {
        Vue.set(state.tabledata[row], col, CODE.Flag);
      }
    },
    [MineSpace](state) {},
    [QuestionSpace](state, { row, col }) {
      if (state.tabledata[row][col] === CODE.FlagOnMine) {
        Vue.set(state.tabledata[row], col, CODE.QuestionOnMine);
      }
      else {
        Vue.set(state.tabledata[row], col, CODE.Question);
      }
    },
    [NormalSpace](state, { row, col }) {
      if (state.tabledata[row][col] === CODE.QuestionOnMine) {
        Vue.set(state.tabledata[row], col, CODE.Mine);
      }
      else {
        Vue.set(state.tabledata[row], col, CODE.Normal);
      }
    },
    [Timer](state) {
      state.Timer += 1;
    },
  },
  actions: {
  },
  modules: {
  }
})
