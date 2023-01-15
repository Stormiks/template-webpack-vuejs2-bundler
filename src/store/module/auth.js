import axios from "axios";
import {
  Store
} from "vuex";

export default {
  state: {
    status: "",
    isLogged: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || ``,
    refreshtoken: localStorage.getItem("refreshtoken") || ``,
    user: {}
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {
    login({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
            url: "/auth/login",
            data: user,
            method: "POST"
          })
          .then(resp => {
            const token = "Bearer " + resp.data.access;
            const refreshtoken = resp.data.refresh;
            localStorage.setItem("token", token);
            localStorage.setItem("refreshtoken", refreshtoken);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user, refreshtoken);
            resolve(resp);
            // console.log(token);
            // console.log(refreshtoken);
          })
          .catch(err => {
            console.log(err);
            commit("auth_error");
            reject(err);
          });
      });
    },
    register({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
            url: "/auth/signup",
            data: user,
            method: "POST"
          })
          .then(resp => {
            const token = "Bearer " + resp.data.access;
            const refreshtoken = resp.data.refresh;
            localStorage.setItem("token", token);
            localStorage.setItem("refreshtoken", refreshtoken);
            axios.defaults.headers.common["Authorization"] = token;
            axios.defaults.headers.common["refresh"] = refreshtoken;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    logout({
      commit
    }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem('token')
        localStorage.removeItem('refreshtoken')
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    async refresh({
      commit,
      state
    }) {
      return await new Promise((resolve, reject) => {
        axios({
            url: "/auth/refresh",
            data: {
              refresh: state.refreshtoken
            },
            method: "POST"
          })
          .then(resp => {
            const token = "Bearer " + resp.data.access;
            const refreshtoken = resp.data.refresh;
            // localStorage.removeItem("token");
            // localStorage.removeItem("refreshtoken");
            localStorage.setItem("token", token);
            localStorage.setItem("refreshtoken", refreshtoken);
            console.log(token);
            console.log(refreshtoken);
            // this.state.auth.token = "Bearer " + response.data.access;
            // this.state.auth.refreshtoken = response.data.refresh;
            axios.defaults.headers.common["Authorization"] = token;
            commit("refresh", token, refreshtoken);
            resolve(resp);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user, refreshtoken) {
      state.status = "success";
      state.token = token;
      state.user = user;
      state.refreshtoken = refreshtoken;
    },
    // мутация для одновленя токена которая записывает изменение 
    refresh(state, token, refreshtoken) {
      state.status = "success";
      state.token = token;
      state.refreshtoken = refreshtoken;
    },
    refreshTimer(state, token, user, refreshtoken) {
      state.status = "success";
      state.token = token;
      state.user = user;
      state.refreshtoken = refreshtoken;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("refreshtoken");
    }
    // refresh_request(state) {
    //   state.status = "refresh";
    // }
  }
};
