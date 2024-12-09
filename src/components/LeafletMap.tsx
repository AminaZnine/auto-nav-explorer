import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Car } from 'lucide-react';

interface MapProps {
  onMapClick: (lat: number, lng: number) => void;
  carLocation?: { lat: number; lng: number };
  waypoints: Array<{ lat: number; lng: number }>;
  isMoving?: boolean;
}

// Fix for default marker icons in Leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapClickHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click: (e) => {
      console.log('Map clicked at:', e.latlng);
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export const LeafletMap = ({ onMapClick, carLocation, waypoints, isMoving }: MapProps) => {
  // Set Lappeenranta as the default center
  const defaultCenter = { lat: 61.0587, lng: 28.1891 };
  const center = carLocation || defaultCenter;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      className="w-full h-[300px] rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />
      
      {/* Display waypoints */}
      {waypoints.map((point, index) => (
        <Marker 
          key={`waypoint-${index}`} 
          position={[point.lat, point.lng]}
          icon={defaultIcon}
        >
          <Popup>
            Waypoint {index + 1}<br />
            Lat: {point.lat.toFixed(6)}<br />
            Lng: {point.lng.toFixed(6)}
          </Popup>
        </Marker>
      ))}

      {/* Display car location */}
      {carLocation && (
        <Marker 
          position={[carLocation.lat, carLocation.lng]} 
          icon={defaultIcon}
        >
          <Popup>
            Current Vehicle Location<br />
            Lat: {carLocation.lat.toFixed(6)}<br />
            Lng: {carLocation.lng.toFixed(6)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};