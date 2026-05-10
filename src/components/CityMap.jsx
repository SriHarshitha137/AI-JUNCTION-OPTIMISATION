import { Circle, CircleMarker, MapContainer, Marker, Popup, Polyline, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { calculateTpi } from '../utils/tpi.js';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function congestionColor(value) {
  if (value >= 75) return '#ef4444';
  if (value >= 50) return '#f59e0b';
  return '#22c55e';
}

export default function CityMap({ junctions, emergencyActive = false }) {
  const center = [12.9768, 77.6038];
  const route = junctions.slice(0, 4).map((junction) => junction.coords);

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        className="map-tile"
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {junctions.map((junction) => (
        <div key={junction.id}>
          <Circle
            center={junction.coords}
            radius={junction.congestion * 16}
            pathOptions={{
              color: congestionColor(junction.congestion),
              fillColor: congestionColor(junction.congestion),
              fillOpacity: 0.25,
              weight: 1,
            }}
          />
          <CircleMarker
            center={junction.coords}
            radius={8}
            pathOptions={{ color: '#67e8f9', fillColor: congestionColor(junction.congestion), fillOpacity: 0.95 }}
          />
          <Marker position={junction.coords} icon={icon}>
            <Popup>
              <strong>{junction.name}</strong>
              <br />
              Congestion: {junction.congestion}%
              <br />
              TPI: {calculateTpi(junction)}
              <br />
              Signal: {junction.signal}
            </Popup>
          </Marker>
        </div>
      ))}
      {emergencyActive && <Polyline positions={route} pathOptions={{ color: '#f43f5e', weight: 6, opacity: 0.85 }} />}
    </MapContainer>
  );
}
