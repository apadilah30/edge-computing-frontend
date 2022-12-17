import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import React, {useState, useEffect, useMemo, useCallback} from "react"
import { io } from "socket.io-client"

const limeOptions = { color: 'lime' }

export default function Map() {
  const [map, setMap] = useState(null)
  const [position, setPosition] = useState([-6.967744833,107.659035833])
  // const [current, setCurrent] = useState([-6.967744833,107.659035833])
  const [polyline, setPolyline] = useState([
    [-6.967744,107.659035]
  ])
  const socket = io("http://localhost:6001", {
    withCredentials: true,
    transports: ["websocket"]
  })

  const topic = "server-topic"
  useEffect(() => {
    socket.on(topic, (data) => {
      const result = fetch("http://localhost:6001/logs/coords")
      .then(res => res.json())
      .then((res) => {
          // setCoords(res)
          setPosition(res[0])
          setPolyline(res)
        })
    });
    navigator.geolocation.getCurrentPosition(function(position) {
      // setCurrent([position.coords.latitude,position.coords.longitude])
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
    })
  }, [topic, socket]);

  return (
    <div>
      <MapContainer
        style={{ height: "70vh", width: "100%" }}
        center={position}
        zoom={18}
        minZoom={5}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWd1c3BhZCIsImEiOiJja2dhdmp2amMwNnE1MnhwaWlkZjllb2txIn0.pyEZZukuQ1IDoboSQQ6EKg"
        />
        <Marker position={position}>
          <Popup>
            
          </Popup>
        </Marker>
        {/* <Marker position={current}>
          <Popup>
            My Position
          </Popup>
        </Marker> */}
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </div>
  );
}
