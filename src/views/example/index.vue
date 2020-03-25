<template>
  <div>
    vue-template
    <v-btn color="blue" dark @click="logout">logout</v-btn>
  </div>
</template>
<script>
export default {
  name: 'Example',
  methods: {
    logout() {
      this.$store.dispatch('system/logout');
      this.$router.push('/login');
    },
  },
};
</script>
