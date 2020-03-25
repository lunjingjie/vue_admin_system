<template>
  <div id="app">
    <web-side-nav v-if="sideNav"></web-side-nav>
<!--    <web-layout :style="{ 'padding-left': sideNav ? '0px' : ($route.name === 'buildingResume' || $route.name === 'Login' ? '0px' : '10px'),-->
<!--    'padding-right': $route.name === 'buildingResume' || $route.name === 'Login' ? '0px' : '10px',-->
<!--    'padding-top': $route.name === 'buildingResume' || $route.name === 'Login' ? '0px' : '10px'}">-->
    <web-layout>
      <v-container>
        <router-view :style="{ 'margin-left': sideNav ? '100px' : '10px' }"></router-view>
      </v-container>
    </web-layout>
  </div>
</template>
<script>
  import { sync } from 'vuex-pathify';
  import WebLayout from './components/web-layout/index.vue';
  import WebSideNav from './components/web-side-nav/index.vue';

  export default {
    components: {
      WebSideNav,
      WebLayout,
    },
    computed: {
      sideNav: sync('layout/sideNav'),
    },
  };
</script>
