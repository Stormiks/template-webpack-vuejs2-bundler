<template>
  <div>
    <div v-bind:class="['wrap', isDeviceMobile]">
      <div>
        <header class="container header">
          <div class="row flex-nowrap align-item-center">
            Шапка страницы
          </div>
        </header>
        <main class="main">
          <div class="main__content">
            <header class="section__headline--page">{{ titlePage }}</header>
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>

    <footer class="container-fluid px-0 footer">
      <div class="row flex-row flex-nowrap mx-0">
        Подвал страницы
      </div>
    </footer>
  </div>
</template>

<script>
import device from "@assets/js/device-init";
export default {
  data() {
    return {
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => this.$router.push("/"));
    }
  },
  computed: {
    isDeviceMobile() {
      return device.typeDevice === "mobile";
    },
    isDeviceTablet() {
      return device.typeDevice === "tablet";
    },
    isDevice() {
      return device.typeDevice === "tablet" || "desktop" || "mobile";
    },
    isAuth() {
      return this.$route.path != "/auth";
    },
    titlePage() {
      return this.$route.meta.title;
    }
  },
  components: {
  },
  name: "DesktopLayout"
};
</script>

<style scoped lang="less">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1s;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
