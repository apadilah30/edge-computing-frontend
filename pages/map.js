import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import React, {useState, useEffect, useMemo} from 'react'
import { Container, Spacer } from '@nextui-org/react'
import { io } from "socket.io-client"
import Map from 'react-map-gl';
import * as turf from '@turf/turf';

const GEOFENCE = turf.circle([-74.0122106, 40.7467898], 5, {units: 'miles'});
export default function Home() {
  const [message, setMessage] = useState([])

  // const socket = io("http://localhost:6001", {
  //   withCredentials: true,
  //   transports: ["websocket"]
  // })
  // const topic = "server-topic"
  // useEffect(() => {
  //     socket.on(topic, (data) => {
  //         setMessage(data);
  //     });
  // }, [topic, socket]);
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 10
  });

  const onMove = React.useCallback(({viewState}) => {
    const newCenter = [viewState.longitude, viewState.latitude];
    // Only update the view state if the center is inside the geofence
    if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
      setViewState(newCenter);
    }
  }, [])
  return (
    <div>
      <Head>
        <title>Realtime Monitoring</title>
        <meta name="description" content="Realtime Monitoring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map    
        {...viewState}
        onMove={onMove}
        style={{width: "100%", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiYWd1c3BhZCIsImEiOiJja2dhdmp2amMwNnE1MnhwaWlkZjllb2txIn0.pyEZZukuQ1IDoboSQQ6EKg"
      />
    </div>
  )
}