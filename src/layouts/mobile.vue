<template>
  <div class="wrap">
    <!-- Навигационный бар -->
    <router-view name="navigation-component"/>
    <!-- Навигационный бар -->
    <div>
      <header class="container-fluid header">
        Шапка страницы
      </header>

      <main class="main">
        <div class="main__content">
          <header class="section__headline--page">{{ titlePage }}</header>
          <router-view></router-view>
        </div>
      </main>

      <footer class="container-fluid footer">
        Подвал страницы
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    titlePage() {
      return this.$route.meta.title;
    },
  },
  components: {
  },
  name: "MobileLayout"
};
</script>
