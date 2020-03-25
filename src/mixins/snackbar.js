export default {
  name: 'SnackBarMixin',
  data() {
    return {
    };
  },
  // snackbarSuccess: 黑色或红色snackbar
  // snackbarText: 内容
  // snackbar: 是否打开
  methods: {
    // 普通提示框
    normalToolTips(text) {
      return {
        snackbarSuccess: true,
        snackbarText: text || '请填写必填项!',
        snackbar: true,
      };
    },
    // 操作成功提示框
    successToolTips(text) {
      return {
        snackbarSuccess: true,
        snackbarText: text || '操作成功!',
        snackbar: true,
      };
    },
    // 操作失败提示框
    failedToolTips(text) {
      return {
        snackbarSuccess: false,
        snackbarText: text || '操作失败!',
        snackbar: true,
      };
    },
  },
};
