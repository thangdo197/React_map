import React, { useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4";
import L from 'leaflet';

// Đặt biểu tượng marker
const customMarkerIcon = new L.Icon({
  iconUrl: 'https://example.com/marker-icon.png', // Đường dẫn tới biểu tượng
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const VN2000Map = () => {
  const mapRef = useRef(null);

  // Định nghĩa VN2000
  proj4.defs(
    "EPSG:3405",
    "+proj=tmerc +lat_0=0 +lon_0=107.75 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,-0.00928836,0.01975479,-0.00427372,0.252906278 +units=m +no_defs"
  );

  const convertVN2000ToWGS84 = (x, y) => {
    const [lon, lat] = proj4("EPSG:3405", "EPSG:4326", [x, y]);
    return [lat, lon];
  };

  // Hàm zoom đến tọa độ
  const zoomToLocation = (coords, zoom = 15) => {
    const map = mapRef.current;
    if (map) {
      map.setView(coords, zoom);
    }
  };

  // Button để test zoom
  const handleZoomClick = () => {
    const vn2000Coords = [500000, 1000000];
    const wgs84Coords = convertVN2000ToWGS84(...vn2000Coords);
    zoomToLocation(wgs84Coords, 15);
  };

  // Tọa độ để đánh dấu
  const markers = [
    { position: [21.0285, 105.8041], label: "Hồ Hoàn Kiếm" },
    { position: [21.0285, 105.8575], label: "Lăng Bác" },
    { position: [21.0300, 105.8350], label: "Nhà Hát Lớn" },
  ];

  // Tọa độ bounding box Hà Nội
  const boundingBox = [[20.9922, 105.7460], [21.0585, 105.8592]]; // [southWest, northEast]

  // Tọa độ để nối
  const polylinePoints = markers.map(marker => marker.position);

  return (
    <div>
      <button onClick={handleZoomClick}>Zoom to Location</button>
      <MapContainer
        ref={mapRef}
        center={[21.0278, 105.8342]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Vẽ bounding box */}
        <GeoJSON
          data={{
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[
                [boundingBox[0][1], boundingBox[0][0]],
                [boundingBox[1][1], boundingBox[0][0]],
                [boundingBox[1][1], boundingBox[1][0]],
                [boundingBox[0][1], boundingBox[1][0]],
                [boundingBox[0][1], boundingBox[0][0]], // Để khép kín polygon
              ]]
            }
          }}
          style={{ color: "blue", weight: 2 }}
        />

        {/* Đánh dấu các tọa độ */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={customMarkerIcon}>
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}

        {/* Nối các điểm với nhau */}
        <Polyline positions={polylinePoints} color="red" weight={4} />
      </MapContainer>
    </div>
  );
};

export default VN2000Map;