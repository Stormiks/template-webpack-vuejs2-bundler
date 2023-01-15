<template>
  <div
    id="app"
    v-bind:class="[isDefaultlayout ? 'wrap' : '']"
    v-bind:style="{ backgroundColor: backgroundLayout }"
    class="row flex-column"
  >
    <transition name="page" mode="out-in">
      <component :is="layout"></component>
    </transition>
  </div>
</template>
<script>
import device from "@assets/js/device-init";
import Axios from "axios";
export default {
  name: "App",

  data() {
    return {
      currentLayout: null
    };
  },
  computed: {
    // Смотрим какой layout определен в маршрутах страниц для подключения
    layout() {
      if (this.$route.meta.layout != "mobile-layout") {
        return "default-layout";
      } else {
        return this.$route.meta.layout;
      }
    },
    backgroundLayout() {
      return this.$route.meta.bgColor || "green-light";
    },
    isDefaultlayout() {
      return this.currentLayout !== "default-layout";
    }
  },
  mounted() {
    // console.log(this.$store.state.auth.isLogged);
    // Перехватчик на обновление токена
    axios.interceptors.response.use(
      response => {
        return response;
      },
      function(error) {
        if (error.response.status === 401 && this.$store.state.auth.isLogged) {
          // console.log(`UpdateToken`);
          axios({
            url: "/auth/refresh",
            data: {
              refresh: localStorage.getItem("refreshtoken")
            },
            method: "POST"
          })
            .then(resp => {
              const token = "Bearer " + resp.data.access;
              const refreshtoken = resp.data.refresh;
              localStorage.setItem("token", token);
              localStorage.setItem("refreshtoken", refreshtoken);
              // console.log(token);
              // console.log(refreshtoken);
              axios.defaults.headers.common["Authorization"] = token;
            })
            .catch(error => {
              // console.log(error);
            });
        }
        return Promise.reject(error.response);
      }
    );
    // таймер на обновление токена авторизации
    setInterval(() => {
      axios({
        url: "/auth/refresh",
        data: {
          refresh: localStorage.getItem("refreshtoken")
        },
        method: "POST"
      })
        .then(resp => {
          const token = "Bearer " + resp.data.access;
          const refreshtoken = resp.data.refresh;
          localStorage.setItem("token", token);
          localStorage.setItem("refreshtoken", refreshtoken);
          console.log(updatetoken);
          // console.log(refreshtoken);
          axios.defaults.headers.common["Authorization"] = token;
        })
        .catch(error => {
          // console.log(error);
        });
    }, 120000);
  },
  updated() {}
};
</script>
