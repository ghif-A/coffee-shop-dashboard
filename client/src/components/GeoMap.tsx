import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useTheme } from "../contexts/ThemeContext";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface OutletData {
  sales_outlet_id: number;
  sales_outlet_type: string;
  store_address: string;
  store_telephone: string;
  store_postal_code: string;
  store_longitude: number;
  store_latitude: number;
}

const GeoMap: React.FC = () => {
  const [outlets, setOutlets] = useState<OutletData[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const baseURL = new String(import.meta.env.VITE_API_ENDPOINT);
    axios.get(`${baseURL}/salesoutlets`).then((response: { data: OutletData[] }) => {
      setOutlets(response.data);
    }).catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px', fontWeight: 'bold' }}>Our Outlets in New York, US</h4>
      <MapContainer center={[40.7328, -73.95]} zoom={10.3} style={{ height: '40vh', width: '80%', margin: '30px', marginTop: '0' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {outlets.map((outlet, index) => (
          <Marker key={index} position={[outlet.store_latitude, outlet.store_longitude]}>
            <Popup>
              <b>Address:</b> {outlet.store_address}<br />
              <b>ID:</b> {outlet.sales_outlet_id}<br />
              <b>Type:</b> {outlet.sales_outlet_type}<br />
              <b>Telephone:</b> {outlet.store_telephone}<br />
              <b>Postal Code:</b> {outlet.store_postal_code}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeoMap;
