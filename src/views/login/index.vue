<template>
  <div>
    <div class="pa-5">
      <v-layout row style="font-weight: 600; position: absolute; top: 30px;"
                class="justify-center"
      >
<!--        <img src="img/icon.png" style="display: inline-block; width: 80px; margin-left: 50px;">-->
        <span style="padding-top: 24px; font-size: 35px; padding-left: 50px; color: #404040;">
          后台管理系统
        </span>
      </v-layout>
      <v-layout class="justify-end loginClass" row style="margin-top: 7%;margin-left: -24px; margin-right: -24px; padding-right: 200px;"
                :style="{'padding-top': (screenheight - screenheight * 0.4 - 228) / 2 + 'px', 'padding-bottom': (screenheight - screenheight * 0.5 - 228) / 2 + 'px'}">
        <v-card style="width: 420px;background: rgba(34,83,222,1);" class="px-5 pt-5 pb-3 elevation-0">
          <v-flex xs12
                  sm12
                  md12
                  lg12
                  xl12
          >
            <!--<img src="img/app/logo.png" style="width: 100px; height: 103px; margin-left: 153px; margin-top: -30px;margin-bottom: 20px;">-->
            <v-form
              ref="form"
            >
              <span style="color: #fff;">账号:</span>
              <v-text-field
                dark
                style="margin-top: -10px;"
                v-model="username"
                color="#fff"
                single-line
                required
              ></v-text-field>

              <span style="color: #fff;">密码:</span>
              <v-text-field
                dark
                style="margin-top: -10px;"
                v-model="password"
                single-line
                color="#fff"
                type="password"
                required
              ></v-text-field>

              <v-btn
                color="rgba(0, 234, 255, 1)"
                @click="login"
                dark
                :loading="btnStatus"
                rounded
                style="float: right;width: 100px;"
              >
                <span style="color: rgba(34, 83, 222, 1);">登录</span>
              </v-btn>
            </v-form>
          </v-flex>
        </v-card>
      </v-layout>
      <v-snackbar
        v-model="snackbarObj.snackbar"
        top
        :color="snackbarObj.snackbarSuccess ? '' : 'error'"
        :timeout="3000"
      >
        {{ snackbarObj.snackbarText }}
      </v-snackbar>
    </div>
  </div>
</template>
<script>
  import snackbarMixin from '@/mixins/snackbar';

  export default {
    name: 'Login',
    mixins: [snackbarMixin],
    data() {
      return {
        btnStatus: false,
        username: '',
        password: '',
        snackbarObj: {
          snackbar: false,
          snackbarText: '',
          snackbarSuccess: false,
        },
        screenheight: document.body.clientHeight,
      };
    },
    methods: {
      async login() {
        this.btnStatus = true;
        // 调用store登录action，存入token到statement和header
        const isLogin = await this.$store.dispatch('system/login', {
          username: this.username,
          password: this.password,
        });
        this.btnStatus = false;
        if (isLogin.flag) {
          this.$router.push('/userManage');
        } else {
          this.snackbarObj = this.failedToolTips(isLogin.description);
        }
      },
    },
  };
</script>
<style scoped>
  .loginClass {
    height: 100%;
    background-image: url(/img/login/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }
</style>
