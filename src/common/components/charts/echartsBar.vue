<template>
  <div :id="id" :style="{width:width + 'px', height: height + 'px'}"></div>
</template>
<script>
  import Util from '@/util';
  import echarts from 'echarts/lib/echarts';
  import 'echarts/lib/chart/bar';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/legendScroll';
  import 'echarts/lib/component/toolbox';

  export default {
    name: 'EchartsBar',
    props: {
      id: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      legendData: {
        type: Array,
        required: true,
      },
      xAxis: {
        type: Array,
        required: true,
      },
      series: {
        type: Array,
        required: true,
      },
      width: {
        type: String,
        required: true,
      },
      height: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        $_bar: null,
      };
    },
    mounted() {
      this.$_bar = echarts.init(document.getElementById(this.id), 'light');
    },
    watch: {
      option() {
        this.$_bar.setOption(this.option, true);
        setTimeout(() => {
          this.$_bar.resize();
        }, 150);
      },
    },
    computed: {
      option() {
        return Util.getEchartBar(this.legendData, this.xAxis, this.unit, this.series);
      },
    },
  };
</script>
