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

export default new Vuex.Store({
  state: {
    tabledata:[],
    data:{
      row:0, //가로
      col:0, //세로
      mine:0 //지뢰
    },
    timer:0,
    result:'',
    
  },
  mutations: { //mutations 통해서 state에 접근
    
    [GameStart](state,{row, col, mine}){

    },
    [OpenSpace](state){},
    [FlagSpace](state){},
    [MineSpace](state){},
    [QuestionSpace](state){},
    [NormalSpace](state){},
    [Timer](state){},
  },
  actions: {
  },
  modules: {
  }
})
