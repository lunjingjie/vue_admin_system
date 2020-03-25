import dayjs from 'dayjs';

function formatWeek(datatime) {
  const week = dayjs(datatime).subtract(0, 'day').format('d');
  if (week === '0') {
    return dayjs(datatime).subtract(6, 'day').format('YYYY-MM-DD');
  }
  if (week === '1') {
    return dayjs(datatime).subtract(0, 'day').format('YYYY-MM-DD');
  }
  return dayjs(datatime).subtract(week - 1, 'day').format('YYYY-MM-DD');
}

/**
 * 根据传入的时间参数，返回不同类型的时间
 * @param dateTime 时间参数
 * @param type 返回时间类型
 * @returns {string|undefined|*} 按照规则格式化后的时间
 */
function formatTime(dateTime, type) {
  if (dateTime && dateTime !== '' && type === 'yesterday') {
    return dayjs(dateTime).subtract(1, 'day').format('YYYY-MM-DD');
  }
  if (dateTime && dateTime !== '' && type === 'month') {
    return dayjs(dateTime).subtract(0, 'month').format('YYYY-MM-01');
  }
  if (dateTime && dateTime !== '' && type === 'nextMonth') {
    return dayjs(dateTime).subtract(-1, 'month').format('YYYY-MM-01');
  }
  if (dateTime && dateTime !== '' && type === 'weekStart') {
    return formatWeek(dateTime);
  }
  if (dateTime && dateTime !== '' && type === 'weekEnd') {
    return dayjs(formatWeek(dateTime)).subtract(-6, 'day').format('YYYY-MM-DD');
  }
  console.error('参数输入错误!');
  return undefined;
}

/**
 * 导出表格数据到Excel(需要先安装依赖xlsx、file-saver)
 * @returns {null}
 */
/* function exportExcelTable(header, dataList, name, fileTitle) {
  require.ensure([], () => {
    const { export_json_to_excel } = require('../vendor/Export2Excel');
    const tHeader = header;
    const filterVal = name;
    const data = formatJson(filterVal, dataList);
    export_json_to_excel(tHeader, data, fileTitle);
  });
} */

/**
 * 根据大气参数数值，返回对应的颜色
 * @param data
 * @param type
 * @returns {string}
 */

// 大气参数范围
const PARAM_LEVEL = {
  PM25: [35, 75, 115, 150, 250],
  PM10: [50, 150, 250, 350, 420],
  O3: [100, 160, 215, 265, 800],
  NO2: [40, 80, 180, 280, 565],
  o3_8h_mean: [100, 160, 215, 265, 800],
};

const LEVEL_COLOR = [
  '#01E401', // 优
  '#E1E101', // 良
  '#E17E00', // 轻度
  '#E10000', // 中度
  '#99004C', // 重度
  '#7E0023', // 严重
];

function tagColorByParamStandard(data, type) {
  let levelColor = '';
  PARAM_LEVEL[type].some((levelVal, index) => {
    // 判定是否为等级1
    if (index === 0 && data < levelVal) {
      levelColor = LEVEL_COLOR[index];
      return true;
      // 如果循环到最后一个等级，则设定颜色为最大等级，并返回true跳出循环
    }
    if (index === PARAM_LEVEL[type].length - 1) {
      levelColor = LEVEL_COLOR[index + 1];
      return true;
    }
    // 如果循环位于等级之间，则设定等级颜色，并返回true跳出循环
    if (data >= levelVal && data < PARAM_LEVEL[type][index + 1]) {
      levelColor = LEVEL_COLOR[index + 1];
      return true;
    }
    // 如果以上皆不符合，则返回false继续循环
    return false;
  });
  return levelColor;
}

/**
 * 数组元素按照指定的字段名进行排序（升序、降序）
 * @param arr 所需要排序的数组
 * @param property 按照哪个字段进行排序
 * @param type 升序asc/降序desc
 * @returns {undefined|*}
 */
function compare(arr, property, type) {
  if (type === 'asc') {
    return arr.sort((a, b) => {
      const value1 = a[property];
      const value2 = b[property];
      return value1 - value2;
    });
  }
  if (type === 'desc') {
    return arr.sort((a, b) => {
      const value1 = a[property];
      const value2 = b[property];
      return value2 - value1;
    });
  }
  console.error('参数输入错误!');
  return undefined;
}

/**
 * 去除重复
 * @param arr 所操作数组
 */
function dropRepetition(arr) {
  const target = [];
  let tempArr = [];
  // 将字符串转成数组
  tempArr = Array.from(arr);
  tempArr.forEach((value) => {
    // 如果target数组中没有该value，则将其添加到数组中
    if (!target.includes(value)) {
      target.push(value);
    }
  });
  return target;
}

/**
 * 数组中是否包含某个元素
 * @param arr
 * @param value
 * @returns {boolean}
 */
function isContain(arr, value) {
  if (arr.indexOf(value) > -1) {
    return true;
  }
  return false;
}

/**
 * 折线图封装
 * @param legendData 图例可选参数数组
 * @param xAxisData x轴数组
 * @param yAxisUnit y轴单位
 * @param series 系列
 */
function getEchartLine(legendData, xAxisData, yAxisUnit, series) {
  return {
    grid: {
      top: '20%',
      left: '6%',
      right: '4%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: legendData,
    },
    toolbox: {
      show: true,
      right: 0,
      feature: {
        dataView: { readOnly: false },
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: [
      {
        name: yAxisUnit,
        type: 'value',
        axisLabel: {
          formatter: '{value}',
        },
        axisLine: {
          lineStyle: {
            color: '#6d6d6d',
          },
        },
        splitLine: {
          show: true,
        },
      },
    ],
    series,
  };
}

/**
 * 柱状图封装
 * @param legendData 图例可选参数数组
 * @param xAxisData x轴数组
 * @param yAxisUnit y轴单位
 * @param series 系列
 */
function getEchartBar(legendData, xAxisData, yAxisUnit, series) {
  return {
    toolbox: [
      {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          backgroundColor: '#6a7985',
        },
      },
      textStyle: {
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: '微软雅黑',
        fontSize: 12,
      },
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '3%',
      top: 80,
      padding: '0 0 20 20',
      containLabel: true,
    },
    legend: {
      width: 600,
      top: 20,
      itemGap: 16,
      itemWidth: 18,
      itemHeight: 10,
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        /* axisLabel: {
          rotate: 50,
        }, */
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: yAxisUnit,
        nameTextStyle: {
          color: '#000',
          padding: [0, 0, 10, 0],
        },
      },
    ],
    series,
  };
}

function getEchartPie(legendData, series) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a}</br>{b}: {d}%',
    },
    legend: {
      top: 10,
      right: 10,
      orient: 'vertical',
      textStyle: {
        color: '#fff',
      },
      x: 'right',
      data: legendData,
    },
    series,
  };
}

export default {
  formatTime,
  tagColorByParamStandard,
  compare,
  dropRepetition,
  isContain,
  getEchartLine,
  getEchartBar,
  getEchartPie,
};
