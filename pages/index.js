import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import React, {useState, useEffect, useMemo} from 'react'
import { Container, Spacer } from '@nextui-org/react'
import Navbar from '../components/Layouts/AppNavbar'
import MonitoringTable from '../components/MonitoringTable'
import { io } from "socket.io-client"

export default function Home() {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });
  const [message, setMessage] = useState([])

  const socket = io("http://localhost:6001", {
    withCredentials: true,
    transports: ["websocket"]
  })
  const topic = "server-topic"

  useEffect(() => {
    // fetch('http://localhost:6001/logs')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setMessage(data)
    //   })
      socket.on(topic, (data) => {
          setMessage(data);
      });
  }, [topic, socket]);

  const wholePage = useMemo(
    () => (
      <div id="map">
        <MapWithNoSSR 
          coors={message}
        />
      </div>
    ),
    [],
  )

  return (
    <div>
      <Navbar />
      <Container>
        <Head>
          <title>Realtime Monitoring</title>
          <meta name="description" content="Realtime Monitoring" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Spacer y={1} />
        {wholePage}
        <Spacer y={1} />
        <MonitoringTable data={message}/>
      </Container>
    </div>
  )
}
