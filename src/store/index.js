import Vue from "vue";
import Vuex from "vuex";
import layoutModule from "./module/layoutModule";
import titlePageModule from "./module/titlePageModule";
import Auth from './module/auth';

Vue.use(Vuex);

let store = new Vuex.Store({
  namespaced: true,
  modules: {
    layout: layoutModule,
    titlePage: titlePageModule,
    auth: Auth,
  }
});

export default store;
