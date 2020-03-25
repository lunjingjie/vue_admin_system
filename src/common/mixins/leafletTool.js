import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw-src';
import 'leaflet-draw/dist/leaflet.draw.css';

export default {
  methods: {
    addLeafletDrawControl(map) {
      const editableLayers = new L.FeatureGroup();
      map.addLayer(editableLayers);
      const options = {
        position: 'topright',
        draw: {
          polyline: {
            shapeOptions: {
              color: '#000',
              weight: 5,
            },
          },
          polygon: {
            allowIntersection: false,
            drawError: {
              color: '#e1e100',
              message: '<strong>不能在此区域绘画!<strong>',
            },
            shapeOptions: {
              color: '#292961',
            },
          },
          circle: false, // Turns off this drawing tool
          circlemarker: false,
          rectangle: false,
          marker: false,
        },
        edit: {
          featureGroup: editableLayers,
          remove: true,
        },
      };

      const drawControl = new L.Control.Draw(options);
      map.addControl(drawControl);
    },
  },
};
