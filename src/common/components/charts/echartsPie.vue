<template>
  <div :id="id" :style="{width:width + 'px', height: height + 'px'}"></div>
</template>
<script>
  import Util from '@/util';
  import echarts from 'echarts/lib/echarts';
  import 'echarts/lib/chart/pie';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/legendScroll';
  import 'echarts/lib/component/toolbox';

  export default {
    name: 'EchartsPie',
    props: {
      id: {
        type: String,
        required: true,
      },
      legendData: {
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
        $_pie: null,
      };
    },
    mounted() {
      this.$_pie = echarts.init(document.getElementById(this.id), 'light');
    },
    watch: {
      option() {
        this.$_pie.setOption(this.option, true);
        setTimeout(() => {
          this.$_pie.resize();
        }, 150);
      },
    },
    computed: {
      option() {
        return Util.getEchartPie(this.legendData, this.series);
      },
    },
  };
</script>
