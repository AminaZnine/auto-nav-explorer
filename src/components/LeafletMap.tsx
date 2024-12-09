import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet with Vite
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Coordinate {
  lat: number;
  lng: number;
}

interface LeafletMapProps {
  points: Coordinate[];
  carLocation?: Coordinate;
  onMapClick: (coord: Coordinate) => void;
}

// Component to handle map center updates
const MapCenter = ({ center }: { center: Coordinate }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center, map]);
  
  return null;
};

// Component to handle map clicks
const MapEvents = ({ onMapClick }: { onMapClick: (coord: Coordinate) => void }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick({ lat, lng });
    },
  });
  return null;
};

export const LeafletMap = ({ points, carLocation, onMapClick }: LeafletMapProps) => {
  const LAPPEENRANTA = { lat: 61.0587, lng: 28.1891 };

  return (
    <MapContainer
      center={[LAPPEENRANTA.lat, LAPPEENRANTA.lng]}
      zoom={13}
      style={{ height: '300px', width: '100%', borderRadius: '0.75rem' }}
    >
      <MapCenter center={LAPPEENRANTA} />
      <MapEvents onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {points.map((point, index) => (
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