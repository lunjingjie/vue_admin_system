<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-navigation-drawer
      stateless
      left
      value="true"
      absolute
      style="position: fixed;padding-top: 10px;margin-top: 48px;"
      width="230"
    >
      <!--菜单列表-->
      <v-list dense rounded>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon color="primary" style="position: absolute; right: -10px; top: 45%;"
                   @click="closeNav" v-on="on">
              <v-icon>mdi-chevron-double-left</v-icon>
            </v-btn>
          </template>
          <span>收起</span>
        </v-tooltip>
        <v-list-item-group
          v-model="currentSelectMenu"
          prepend-icon="account_circle"
          color="#3F51B5"
        >
          <v-list-item-content>
            <v-list-item-title style="padding-left: 25px; font-weight: bold;">{{ navItem.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item
            v-for="(data, index) in firstItems"
            :key="`first${index}`"
            @click="redirectToPage(data.path)"
          >
            <v-list-item-title style="padding-left:24px;">{{data.name}}</v-list-item-title>
            <v-list-item-icon style="padding-top: 9px;">
              <v-icon>mdi-arrow-right-circle</v-icon>
            </v-list-item-icon>
          </v-list-item>


          <template v-for="(item, index) in secondItems">
            <v-list-group
              no-action
              sub-group
              :key="`second${index}`"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="(three, i) in item.children"
                :key="i"
                @click="redirectToPage(three.path)"
              >
                <v-list-item-title style="padding-left:24px;">{{three.name}}</v-list-item-title>
                <v-list-item-icon style="padding-top: 9px;">
                  <v-icon>mdi-arrow-right-circle</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>
          </template>

        </v-list-item-group>
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
      firstItems() {
        return this.navItem.children.filter(item => item.children === undefined);
      },
      secondItems() {
        return this.navItem.children.filter(item => item.children !== undefined && item.children.length > 0);
      },
    },
    data() {
      return {
        currentSelectMenu: -1,
      };
    },
    watch: {
      navItem() {
        this.currentSelectMenu = -1;
      },
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
