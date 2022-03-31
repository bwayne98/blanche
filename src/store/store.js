import { createStore } from "vuex";

export default createStore({
  state: {
    // {id,product_name,price,url,count}
    shop_car: [],
  },
  getters: {
    shop_car_total_count: (state) =>{
      if (state.shop_car.length === 0){
        return 0;
      }else{
        return state.shop_car.reduce((pre,cur)=> pre + cur.count, 0);
      }
    },
    shop_car_total_price:(state)=>{
      if (state.shop_car.length === 0){
        return 0;
      }else{
        return state.shop_car.reduce((pre,cur)=> pre + cur.count * cur.price, 0);
      }
    }
  },

  mutations: {
    setShopCar(state, payload) {
      state.shop_car = payload;
    },
    setShopCarCount(state, payload){
      // {index,count}
      state.shop_car[payload.index].count = payload.count;
    },
    removeShopCarItem(state, payload){
      // payload == id
      state.shop_car = state.shop_car.filter(item => item.id !== payload.id)
    }
  },
  actions: {
    pushShopCar({ state, commit }, payload) {
      //payload == shop_car item
      let index = state.shop_car.findIndex((item) => {
        return item.id === payload.id;
      });
      if (index === -1) {
        payload.count = 1;
        commit("setShopCar", [...state.shop_car, payload]);
      }else{
        commit('setShopCarCount' , {'index': index, 'count': state.shop_car[index].count+1})
      }
    },
    removeShopCar({ state, commit }, payload) {
      //payload == item.id
        commit("removeShopCarItem", {'id':payload.id});

    },
  },
  modules: {},
});
