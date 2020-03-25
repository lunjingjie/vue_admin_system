// 定义系统级别过滤器
import Vue from 'vue';

const systemFilters = function install(vue) {
  vue.filter('fixTwo', value => (value !== null ? value.toFixed(2) : '--'));
};

Vue.use(systemFilters);
