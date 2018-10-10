<template>
  <div id="app">
    <div class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/companies">Companies</el-menu-item>
      </el-menu>
    </div>

    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        activeIndex: '/'
      }
    },
    mounted() {
      this.$store.commit('loadCompaniesList');
    }
  }
</script>

<style>
  body {
    margin: 0;
    overflow: hidden;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    padding-top: 60px;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
</style>