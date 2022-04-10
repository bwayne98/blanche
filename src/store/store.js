import { createStore } from "vuex";

import db from "./firestore.js";

import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth();

const setFireStareShopCar = (list) => {
  let user = auth.currentUser;
  if (auth.currentUser) {
    setDoc(doc(db, "blanche", "member", user.uid, "shopcar"), {
      list,
    }).catch((err) => {
      console.log("update fail");
    });
  } else {
    return;
  }
};

export default createStore({
  state: {
    // {id,product_name,price,url,count}
    shop_car: [],
    user: {
      email: '',
      uid: ''
    },
  },
  getters: {
    shop_car_total_count: (state) => {
      if (state.shop_car.length === 0) {
        return 0;
      } else {
        return state.shop_car.reduce((pre, cur) => pre + cur.count, 0);
      }
    },
    shop_car_total_price: (state) => {
      if (state.shop_car.length === 0) {
        return 0;
      } else {
        return state.shop_car.reduce((pre, cur) => pre + cur.count * cur.price, 0);
      }
    },
    shop_car_counts: (state) => {
      return state.shop_car.map(item => item.count);
    }
  },

  mutations: {
    setShopCar(state, payload) {
      state.shop_car = payload;
    },
    setShopCarCount(state, payload) {
      // {index,count}
      state.shop_car[payload.index].count = payload.count;
    },
    removeShopCarItem(state, payload) {
      // payload == id
      state.shop_car = state.shop_car.filter((item) => item.id !== payload.id);
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    updateShopCar({ state, commit }, payload) {
      commit("setShopCar", payload);
      setFireStareShopCar(state.shop_car);
    },
    cleanShopCar({ commit }){
      commit("setShopCar", []);
    },
    pushShopCar({ state, commit }, payload) {
      //payload == shop_car item
      let index = state.shop_car.findIndex((item) => {
        return item.id === payload.id;
      });
      if (index === -1) {
        commit("setShopCar", [...state.shop_car, payload]);
      } else {
        commit("setShopCarCount", {
          index: index,
          count: state.shop_car[index].count + payload.count,
        });
      }
      setFireStareShopCar(state.shop_car);
    },
    removeShopCar({ state, commit }, payload) {
      //payload == item.id
      commit("removeShopCarItem", { id: payload.id });
      setFireStareShopCar(state.shop_car);
    },
    updateUser({ commit }, payload) {
      commit('setUser', payload)
    }
  },
  modules: {},
});
