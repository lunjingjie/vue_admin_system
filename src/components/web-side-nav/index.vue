<template>
  <div>
    <v-navigation-drawer
      stateless
      left
      value="true"
      absolute
      style="padding-top: 55px;margin-top: 48px;"
      width="250"
    >
      <!--菜单列表-->
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <span style="position: absolute; right: 49px; top: 18px; color: #9c9c9c;">收起菜单</span>
            <v-btn icon flat color="primary" style="position: absolute; right: 15px; top: 16px;"
            @click="closeNav">
              <v-icon>arrow_back</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-group
          :prepend-icon="navItem.icon"
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>{{ navItem.name }}</v-list-tile-title>
            </v-list-tile>
          </template>
          <template v-for="(data, index) in navItem.children">
            <v-list-group
              :key="`twoMenu${index}`"
              sub-group
              no-action
            >
              <template v-slot:activator v-if="data.children !== null && data.children.length > 0">
                <v-list-tile>
                  <v-list-tile-title>{{ data.name }}</v-list-tile-title>
                </v-list-tile>
              </template>
              <template v-slot:activator v-else>
                <v-list-tile class="removeIcon">
                  <v-list-tile-title @click="redirectToPage(data.path)">{{ data.name }}</v-list-tile-title>
                </v-list-tile>
              </template>
              <v-list-tile
                v-for="(crud, i) in data.children"
                :key="`threeMenu${i}`"
                @click="redirectToPage(crud.path)"
              >
                <v-list-tile-title v-text="crud.name"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="crud.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
  import { sync } from 'vuex-pathify';
  export default {
    name: 'WebSideNav',
    computed: {
      navItem: sync('layout/navItem'),
      sideNav: sync('layout/sideNav'),
    },
    methods: {
      // 关闭菜单
      closeNav() {
        this.sideNav = false;
      },
      redirectToPage(path) {
        if (this.$route.path !== `/${path}`) {
          this.$router.push({ path });
        }
      },
    },
  };
</script>
