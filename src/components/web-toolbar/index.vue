<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-toolbar color="primary"
             dense
             dark
             style="position: fixed; width: 100%;"
             v-if="$route.name!=='Login' && toolbarOpened">
    <v-btn icon
           v-if="this.navItem.children !== undefined"
           @click="collapseMenu">
      <v-icon>menu</v-icon>
    </v-btn>
    <v-toolbar-title style="cursor: pointer;font-size: 16px;" @click="$router.push('/tableCrud')">
      后台管理系统
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="$route.name!=='Login'">
      <!--退出全屏fullscreen-exit-->
      <v-btn icon>
        <v-icon dark>mdi-fullscreen</v-icon>
      </v-btn>
      <!--黑夜模式brightness-4-->
      <v-btn icon>
        <v-icon dark>mdi-brightness-6</v-icon>
      </v-btn>
      <template v-for="(data, index) in menuItems">
        <v-btn text small :key="`menu${index}`" v-if="data.children !== undefined && data.children.length > 0"
               @click="updateSideNavItem(data)">
        <span class="tool-bar-custom-class">
          {{ data.name }}
        </span>
          <v-icon right dark>mdi-menu-down</v-icon>
        </v-btn>
        <v-btn text small :key="`menu${index}`" v-if="data.children === undefined"
               @click="singleRoute(data)">
          <span class="tool-bar-custom-class">
          {{ data.name }}
        </span>
        </v-btn>
      </template>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>用户：{{username}}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>退出登录</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>
<script>
  import { sync } from 'vuex-pathify';

  export default {
    name: 'WebToolBar',
    data() {
      return {
        menuItems: [
          {
            name: '默认页',
            route: '',
            icon: '',
            children: [
              {
                name: '列表增删改查',
                path: 'tableCrud',
                icon: '',
              },
              {
                name: '菜单1',
                path: '',
                icon: '',
                children: [
                  {
                    name: '菜单1_1',
                    path: '',
                    icon: '',
                  },
                  {
                    name: '菜单1_2',
                    path: '',
                    icon: '',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
    computed: {
      toolbarOpened: sync('layout/toolBar'),
      navItem: sync('layout/navItem'),
      sideNav: sync('layout/sideNav'),
      username: sync('system/username'),
      // menuItems: sync('system/menu'),
    },
    mounted() {
      // this.menuItems = JSON.parse(window.localStorage.getItem('menu'));
    },
    methods: {
      logout() {
        this.sideNav = false;
        this.$store.dispatch('system/logout');
        this.$router.push('/login');
      },
      collapseMenu() {
        this.sideNav = !this.sideNav;
      },
      singleRoute(data) {
        if (this.$route.name !== data.path) {
          this.sideNav = false;
          this.$router.push({ name: data.path });
        }
      },
      updateSideNavItem(item) {
        this.sideNav = true;
        this.navItem = item;
      },
    },
  };
</script>
<style scoped>
  .tbcolor {
    background: linear-gradient(to right, #031d4e, #19539c);
  }

  .listTile:hover {
    cursor: pointer;
  }

  .tool-bar-custom-class:hover {
    cursor: pointer;
  }
</style>
