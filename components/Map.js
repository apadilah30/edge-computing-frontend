import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, LayersControl, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import React, {useState, useEffect, useMemo, useCallback} from "react"
import { Grid, Card, Text, Badge } from "@nextui-org/react"
import { io } from "socket.io-client"
import L from "leaflet"
import Control from 'react-leaflet-custom-control'

const getColor = d => {
  return d == "MESHEDGE012301"
    ? "#008ffb"
    : d == "MESHEDGE012302"
    ? "#00e396"
    : d == "MESHEDGE012303"
    ? "#feb019"
    : "#ff0401";
};

export default function Map() {
  const [map, setMap] = useState(null)
  const [logUrl, setLogUrl] = useState('http://localhost:6001')
  const [position, setPosition] = useState([-6.967744833,107.659035833])
  const [devices, setDevices] = useState([])
  // const [current, setCurrent] = useState([-6.967744833,107.659035833])
  const [polyline, setPolyline] = useState([])
  
  const socket = io("http://localhost:6001", {
    withCredentials: true,
    transports: ["websocket"]
  })

  const topic = "server-topic"
  const result = fetch("http://localhost:6001/logs/coords")
                  .then(res => res.json())
                  .then((res) => {
                    // setCoords(res)
                    setPosition(res[0])
                    setPolyline(res)
                  })
                  
  
  // Devices
  fetch(logUrl+"/devices")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setDevices(data)
    })
 
  
  return (
    <div>
      <MapContainer
        style={{ height: "450px", width: "100%" }}
        center={position}
        zoom={20}
        minZoom={5}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWd1c3BhZCIsImEiOiJja2dhdmp2amMwNnE1MnhwaWlkZjllb2txIn0.pyEZZukuQ1IDoboSQQ6EKg"
        />
        {/* <Marker position={current}>
          <Popup>
            My Position
          </Popup>
        </Marker> */}
        { polyline !== null && polyline.length > 0 && polyline.filter((item) => item.data.length > 0)?.map((item, index) => (
          <>
            <Polyline color={getColor(item.name)} positions={item.data} />
            <CircleMarker center={item.data[0]} radius={5} color={getColor(item.name)} fillColor="blue">
              <Popup >
                ID : {item.name} <br/>
                Lat : {item.data[0].lat} <br/>
                Lng : {item.data[0].lng} <br/>
                RSSI  : -70 dBm <br/>
                SNR : 9.25 <br/>
                CPU : 100% <br/>
                RAM : 7% <br/>
                ROM : 18% <br/>
              </Popup>
            </CircleMarker>
            {/* <Marker position={item.data[0]}>
              <Popup >
                {item.name}
              </Popup>
            </Marker> */}
          </>
        )) }
        <Control prepend position='bottomright'>
          <Grid.Container>
            <Grid direction="column">
              <Text>
                <Badge isSquared css={{
                  background: getColor("EDGE-SERVER"),
                  width: "100%"
                }}>EDGE-SERVER</Badge>
              </Text>
              { devices !== null && devices.length > 0 && devices.map((item, index) => (
                <>
                <Text>
                  <Badge isSquared css={{
                    background: getColor(item.name),
                    width: "100%"
                  }}>{item.name}</Badge>
                </Text>
                </>
              ))}
              {/* <Text>
                <Badge isSquared css={{
                  background: getColor("MKRRMP011222"),
                  widthh: "100%"
                }}>MKRRMP011222</Badge>
              </Text>
              <Text>
                <Badge isSquared css={{
                  background: getColor("MKRRMP021222"),
                  widthh: "100%"
                }}>MKRRMP021222</Badge>
              </Text>
              <Text>
                <Badge isSquared css={{
                  background: getColor("MKRRMP031222"),
                  widthh: "100%"
                }}>MKRRMP031222</Badge>
              </Text> */}
            </Grid>
          </Grid.Container>
        </Control>
      </MapContainer>
    </div>
  );
}
