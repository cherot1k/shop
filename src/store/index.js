import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basket:[],
    dollar: null,
    totalPrice: 0,
    items: [],
    selectedItems:[],
    nonMobile:true
  },
  mutations: {
    ADDITEM(state,item) {
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

    },
    REMOVEITEM(state,item) {
      state.basket =  state.basket.filter(i => i.code !== item.code)
    },
    CHANGEHOWMANY(state,object){
      state.basket = state.basket.map(item => {
        if(item.code === object.code){
          item.howMany = item.howMany + object.howMany
          return item
        }else{
          return item
        }
      })
    },
    SETDOLLAR(state,dollar){
      state.dollar = dollar
    },
    CHANGETOTALPRICE(state,money){
      state.totalPrice += parseInt( money)
    },
    GETBASKETITEMBYCODE(state, code){
      return  state.basket.reduce((accumulator, currentValue, currentIndex, array) => {
        if(accumulator.code === code){
          return accumulator
        }else{
          return currentValue
        }
      })
    },

    SETSELECTEDITEMS(state,items){
      state.selectedItems = items
    },
    SETITEMS(state,items){
      state.items = items
    }
  },
  actions: {
    addItem(ctx,item){
      ctx.commit('ADDITEM',item)

    },
    removeItem(ctx,item){
      ctx.commit('REMOVEITEM',item)
    },
  },
  getters:{
    basket: s => s.basket,
    totalPrice: s => s.totalPrice,
    items: s => s.items
  },
  modules: {
  }
})
