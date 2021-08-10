import { createStore } from 'vuex'

export default createStore({
  state: {
    userName:''
  },
  mutations: {
    setName(state, userName) {
      state.userName = userName
    }
  },
  getters:{
    getUserName: state => state.userName
  },
  actions: {
  },
  modules: {
  }
})
