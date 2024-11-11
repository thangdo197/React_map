import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import proj4 from "proj4";
import L from "leaflet";
import leafShadow from "./leaf-shadow.png";
import leafGreen from "./leaf-green.png";
const icon = new L.icon({
  iconUrl: leafGreen,
  shadowUrl: leafShadow,

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const VN2000Map = () => {
  const mapRef = useRef(null);

  proj4.defs(
    "EPSG:3405",
    "+proj=tmerc +lat_0=0 +lon_0=107.75 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,-0.00928836,0.01975479,-0.00427372,0.252906278 +units=m +no_defs"
  );

  const convertVN2000ToWGS84 = (x, y) => {
    const [lon, lat] = proj4("EPSG:3405", "EPSG:4326", [x, y]);
    return [lat, lon];
  };

  const convertWGS84ToVN2000 = (lat, lon) => {
    const [x, y] = proj4("EPSG:4326", "EPSG:3405", [lon, lat]);
    return [x, y];
  };

  const markers = [
    { position: [21.0285, 105.8041], label: "Hoan Kiem Lake" },
    { position: [21.0285, 105.8575], label: "Lang Bac" },
    { position: [21.03, 105.835], label: "Hanoi Opera House" },
  ];

  const boundingBox = [
    [20.9922, 105.746],
    [21.0585, 105.8592],
  ];

  return (
    <div>
      <MapContainer
        ref={mapRef}
        center={[21.0278, 105.8342]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <GeoJSON
          data={{
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [boundingBox[0][1], boundingBox[0][0]],
                  [boundingBox[1][1], boundingBox[0][0]],
                  [boundingBox[1][1], boundingBox[1][0]],
                  [boundingBox[0][1], boundingBox[1][0]],
                  [boundingBox[0][1], boundingBox[0][0]],
                ],
              ],
            },
          }}
          style={{ color: "grey", weight: 2 }}
        />

        {markers.map((marker, index) => {
          const [x, y] = convertWGS84ToVN2000(
            marker.position[0],
            marker.position[1]
          );
          return (
            <Marker key={index} position={marker.position} icon={icon}>
              <Tooltip>
                {`${marker.label} coordinates by VN2000: ${x.toFixed(
                  2
                )}, ${y.toFixed(2)}`}{" "}
              </Tooltip>
              <Popup>{marker.label}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default VN2000Map;
