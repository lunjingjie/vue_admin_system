<template>
  <div id="app">
    <web-side-nav v-if="sideNav"></web-side-nav>
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
    async created() {
      this.$store.dispatch('system/isLogin');
    },
  };
</script>
