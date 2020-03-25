<template>
  <v-app>
    <!--toolbar-->
    <div>
      <web-tool-bar style="z-index: 100;"></web-tool-bar>
    </div>
    <!--content-->
    <v-content :style="{'margin-left': sideNav ? '260px' : '0px'}">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
  import { sync } from 'vuex-pathify';
  import WebToolBar from '../web-toolbar/index.vue';

  export default {
    name: 'WebLayout',
    components: {
      WebToolBar,
    },
    computed: {
      sideNav: sync('layout/sideNav'),
    },
  };
</script>
