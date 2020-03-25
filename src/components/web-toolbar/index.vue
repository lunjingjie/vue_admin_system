<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-toolbar color="primary"
             dense
             dark
             v-if="$route.name!=='Login' && toolbarOpened">
    <v-btn icon color=""
           v-if="this.navItem.children !== undefined"
           @click="collapseMenu">
      <v-icon>menu</v-icon>
    </v-btn>
    <v-toolbar-title style="cursor: pointer;font-size: 20px;" @click="$router.push('/')">
      test
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="$route.name!=='Login'">
      <v-btn text small v-for="(data, index) in menuItems" :key="`menu${index}`">
        <span v-if="data.children !== null && data.children.length > 0" @click="updateSideNavItem(data)"
              class="tool-bar-custom-class">
          {{ data.name }}
        </span>
        <span v-if="data.children === null" class="tool-bar-custom-class" @click="singleRoute(data)">
          {{ data.name }}
        </span>
      </v-btn>
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
    <!--<v-list v-if="data.children.length > 0">
      <v-list-tile v-for="(item, index) in data.children" :key="`child${index}`">
        <v-list-tile-title v-text="item.name"
                           @click="$router.push({ name: item.route })"
                           class="listTile"
        ></v-list-tile-title>
      </v-list-tile>
    </v-list>-->
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
            name: '监管一张图',
            route: 'buildingResume',
            icon: 'mdi mdi-map-search',
            children: [],
          },
          {
            name: '数据导出',
            route: 'exportSegment',
            icon: 'mdi mdi-map-search',
            children: [],
          },
          {
            name: '数据查询',
            route: '',
            icon: 'mdi mdi-file-document-box-multiple',
            children: [
              // {
              // name: '用户信息录入',
              // route: 'workerInput',
              // children: [],
              // },
              {
                name: '工地基础信息',
                route: 'buildingData',
                children: [],
              },
              {
                name: '施工人员基础信息',
                route: 'workerData',
                children: [],
              },
            ],
          },
          {
            name: '系统管理',
            route: '',
            icon: 'mdi mdi-file-table',
            children: [
              {
                name: '基础信息录入管理',
                route: '',
                icon: '',
                children: [
                  {
                    name: '项目信息录入',
                    route: 'input',
                    children: [],
                  },
                  {
                    name: '企业信息录入',
                    route: 'enpInput',
                    children: [],
                  },
                  {
                    name: '标段信息录入',
                    route: 'segmentInput',
                    children: [],
                  },
                  {
                    name: '标段企业信息录入',
                    route: 'segmentEnterpriseInput',
                    children: [],
                  },
                ],
              },
              {
                name: 'APP管理',
                route: '',
                icon: '',
                children: [
                  {
                    name: '版本管理',
                    route: 'appManage',
                    children: [],
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
