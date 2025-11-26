import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const locations = [
  { city: "Assotech Business Cresterra, Sector 135 Noida, Uttar Pradesh", lat: 28.5016, lng: 77.4085 },
  { city: "Candor TechSpace, Sector 135, Noida", lat: 28.4979, lng: 77.4076 },
  { city: "Oxygen Business Park, Sector 144, Noida", lat: 28.4955, lng: 77.4162 },
];

const Location = () => (
  <MapContainer center={[28.5016, 77.4085]} zoom={12} style={{ height: "500px", width: "100%" }} className='py-5'>
   <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> Jenika Venture'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {locations.map((loc, i) => (
      <Marker key={i} position={[loc.lat, loc.lng]}>
        <Popup>{loc.city}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default Location;
