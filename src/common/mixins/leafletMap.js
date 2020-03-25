import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-polylinedecorator/dist/leaflet.polylineDecorator';

export default {
  data() {
    return {
      map: null,
      mapTile: '',
      // marker
      marker: null,
      markerList: [],
      // polyline
      polyline: null,
      polylineList: [],
      decorator: null,
      // polygon
      polygon: null,
      polygonList: [],
    };
  },
  destroyed() {
    this.map.remove();
  },
  methods: {
    /**
     * 初始化地图
     * @param id 容器id
     * @param type 地图类型
     * @param locate 中心坐标
     * @param zoom 缩放级别
     */
    // http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga
    initMap(id, type, locate, zoom) {
      let mapTileUrl = '';
      if (type === 'light') {
        mapTileUrl = 'http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga';
      } else if (type === 'dark') {
        mapTileUrl = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}';
      } else if (type === 'satellite') {
        mapTileUrl = 'http://mt0.google.cn/vt/lyrs=s@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga';
      }
      this.map = L.map(id, {
        renderer: L.canvas(),
        attributionControl: false,
        zoomControl: false,
      }).setView(locate, zoom);
      this.mapTile = L.tileLayer(mapTileUrl).addTo(this.map);
    },
    drawMarker() {
    },
    removeMarker() {
      this.removeElement(this.markerList);
    },
    drawPolygon(DataList) {
      const arr = [];
      DataList.forEach((data) => {
        arr.push([data.latitude, data.longitude]);
      });
      const block = L.polygon(arr, {
        color: 'green',
        fillOpacity: 0.6,
        weight: 2,
      }).addTo(this.map);
      this.polygonList.push(block);
    },
    removePolygon() {
      this.removeElement(this.polygonList);
    },
    drawPolyline(dataList) {
      const arr = [];
      dataList.forEach((data) => {
        arr.push([data.latitude, data.longitude]);
      });
      this.polyline = L.polyline(arr, { color: '#000080', weight: 6, opacity: 0.5 }).addTo(this.map);
      this.decorator = L.polylineDecorator(this.polyline, {
        patterns: [
          {
            offset: 0,
            repeat: 100,
            symbol: L.Symbol.arrowHead({
              pixelSize: 4,
              polygon: false,
              pathOptions: {
                color: '#fff',
                stroke: true,
              },
            }),
          },
        ],
      }).addTo(this.map);
    },
    removePolyline() {
      this.removeElement(this.polylineList);
    },
    removeElement(dataList) {
      if (dataList) {
        dataList.forEach((data) => {
          data.remove();
        });
      }
    },
  },
};
