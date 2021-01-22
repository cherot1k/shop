import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basket:[],
    dollar: null,
    totalPrice: 0
  },
  mutations: {
    ADDITEM(state,item) {
      let includes = false
      for(let val of state.basket){
        if(val.code === item.code){
          includes = true
        }
      }
      if(!includes){
        state.basket.push(item)
        let number = (item.price * state.dollar)/100
        if(number - Math.trunc(number) < 0.5 && number - Math.trunc(number) !== 0){
          number = (Math.trunc(number) * 100 + 50)
        }else if(number - Math.trunc(number) > 0.5){
          number = (Math.trunc(number) * 100 + 100)
        }else{
          number = (number*100)
        }
        state.totalPrice += number
      }
    },
    REMOVEITEM(state,item) {
      state.basket =  state.basket.filter(i => i.code !== item.code)
    },
    CHANGEHOWMANY(state,object){
      state.basket = state.basket.map(item => {
        if(item.code === object.code){
          item.howMany = item.howMany + object.howMany
          return item
        }
      })
    },
    SETDOLLAR(state,dollar){
      state.dollar = dollar
    },
    CHANGETOTALPRICE(state,money){
      state.totalPrice += parseInt( money)
    }
  },
  actions: {
    addItem(ctx,item){
      ctx.commit('ADDITEM',item)

    },
    removeItem(ctx,item){
      ctx.commit('REMOVEITEM',item)
    }
  },
  getters:{
    basket: s => s.basket,
    totalPrice: s => s.totalPrice
  },
  modules: {
  }
})
