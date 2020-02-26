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
    opencount : 0,
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
      state.opencount = 0;
      state.result = ''
    },
    [OpenSpace](state, { row, col }) {
      let opencount = 0;
      const ck = []; //방문했는지 체크
      function checkAround(row, col) { // 주변 8칸 지뢰인지 검색
        const ckRowOrcolIsUndefined = row < 0 || row >= state.tabledata.length || col < 0 || col >= state.tabledata[0].length;
        if (ckRowOrcolIsUndefined) {
          return; //언디파인드 거름
        }
        if ([CODE.Open, CODE.Flag, CODE.FlagOnMine, CODE.QuestionOnMine, CODE.Question, CODE.Mine].includes(state.tabledata[row][col])) {
          return; //열린칸, 깃발, 물음표, 지뢰 거름
        }
        if (ck.includes(row + '/' + col)) { //방문한 칸 기록해줌
          return;
        } else {
          ck.push(row + '/' + col);
        }
        let around = [];
        if (state.tabledata[row - 1]) {
          around = around.concat([
            state.tabledata[row - 1][col - 1], state.tabledata[row - 1][col], state.tabledata[row - 1][col + 1]
          ]);
        }
        around = around.concat([
          state.tabledata[row][col - 1], state.tabledata[row][col + 1]
        ]);
        if (state.tabledata[row + 1]) {
          around = around.concat([
            state.tabledata[row + 1][col - 1], state.tabledata[row + 1][col], state.tabledata[row + 1][col + 1]
          ]);
        }
        const counted = around.filter(function(v) {
          return [CODE.Mine, CODE.FlagOnMine, CODE.QuestionOnMine].includes(v);
        });
        if (counted.length === 0 && row > -1) { // 주변칸에 지뢰가 하나도 없으면
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, col - 1]);
            near.push([row - 1, col]);
            near.push([row - 1, col + 1]);
          }
          near.push([row, col - 1]);
          near.push([row, col + 1]);
          if (row + 1 < state.tabledata.length) {
            near.push([row + 1, col - 1]);
            near.push([row + 1, col]);
            near.push([row + 1, col + 1]);
          }
          near.forEach((n) => {
            if (state.tabledata[n[0]][n[1]] !== CODE.Open) {
              checkAround(n[0], n[1]);
            }
          });
        }
        if (state.tabledata[row][col] === CODE.Normal) {
          opencount += 1;
        }
        Vue.set(state.tabledata[row], col, counted.length);
      }
      checkAround(row, col);
      let halted = false;
      let result = '';
      if (state.data.row * state.data.col - state.data.mine === state.opencount + opencount) {
        // state.opencount = 지금까지 연 칸의 개수 opencount = 지금 연 칸 
        halted = true;
        result = `${state.Timer}초만에 승리하셨습니다.`;
      }
      
      state.opencount += opencount;
      state.halted = halted;
      state.result = result;
    },
    [FlagSpace](state, { row, col }) {
      if (state.tabledata[row][col] === CODE.Mine) {
        Vue.set(state.tabledata[row], col, CODE.FlagOnMine);
      }
      else {
        Vue.set(state.tabledata[row], col, CODE.Flag);
      }
    },
    [MineSpace](state,{row,col}) {
      state.halted = true;
      Vue.set(state.tabledata[row],col,CODE.ClickMine)
      let result = `${state.Timer}초만에 패배하셨습니다.`;
      state.result = result;
    },
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
