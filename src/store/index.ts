import { createStore } from 'vuex'

export default createStore({
  state: {
    userName:sessionStorage.getItem("userName") || '',
  },
  mutations: {
    setName(state, userName) {
      sessionStorage.setItem('userName', userName)
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
