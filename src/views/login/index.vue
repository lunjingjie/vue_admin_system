<template>
  <div class="pa-5">
    <v-layout row style="font-size: 30px; font-weight: 600; position: relative;top: 60px;"
              class="justify-center"
    >
      白海豚后台管理
    </v-layout>
    <v-layout class="justify-center" row>
      <v-card style="margin-top: 10%; width: 520px;background: rgba(255,255,255,0.84);" class="px-5 pt-5 pb-3 elevation-12">
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
            账号:
            <v-text-field
              style="margin-top: -10px;"
              v-model="username"
              single-line
              required
            ></v-text-field>

            密码:
            <v-text-field
              style="margin-top: -10px;"
              v-model="password"
              single-line
              type="password"
              required
            ></v-text-field>

            <v-btn
              color="blue darken-2"
              @click="login"
              dark
              :loading="btnStatus"
              style="float: right;"
            >
              登录
            </v-btn>
          </v-form>
        </v-flex>
      </v-card>
    </v-layout>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data() {
      return {
        btnStatus: false,
        username: 'admin',
        password: 'create8z',
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
          this.$router.push('/example');
        } else {
          alert(isLogin.description);
        }
      },
    },
  };
</script>
