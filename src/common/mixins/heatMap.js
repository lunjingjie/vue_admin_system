import HeatMap from 'leaflet-heatmap/leaflet-heatmap';

export default {
  data() {
    return {
      heatMapLayer: null,
      heatMapData: {
        min: 0, max: 0, data: [],
      },
    };
  },
  watch: {
    heatMapData: {
      deep: true,
      handler() {
        this.removeHeatMap();
        this.heatMapLayer.setData(this.heatMapData);
      },
    },
  },
  methods: {
    initHeatMap(option = {
      radius: 0.006,
      maxOpacity: 0.55,
      scaleRadius: true,
      valueField: 'value',
    }) {
      this.heatMapLayer = new HeatMap(option).addTo(this.map);
    },
    removeHeatMap() {
      this.heatMapLayer.setData({
        min: 0, max: 65, data: [],
      });
    },
  },
};
