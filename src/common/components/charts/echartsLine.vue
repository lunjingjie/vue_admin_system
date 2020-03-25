<template>
  <div :id="id" :style="{width:width + 'px', height: height + 'px'}"></div>
</template>
<script>
  import Util from '@/util';
  import echarts from 'echarts/lib/echarts';
  import 'echarts/lib/chart/line';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/legendScroll';
  import 'echarts/lib/component/toolbox';

  export default {
    name: 'EchartsLine',
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
        $_line: null,
      };
    },
    mounted() {
      this.$_line = echarts.init(document.getElementById(this.id), 'light');
    },
    watch: {
      option() {
        this.$_line.setOption(this.option, true);
        setTimeout(() => {
          this.$_line.resize();
        }, 150);
      },
    },
    computed: {
      option() {
        return Util.getChartsPie(this.legendData, this.xAxis, this.unit, this.series);
      },
    },
  };
</script>
