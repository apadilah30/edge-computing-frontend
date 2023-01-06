import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import React, {useState, useEffect, useMemo} from 'react'
import { Container, Spacer, Link, Button, Grid, Radio, Text, Card, Badge } from '@nextui-org/react'
import Navbar from '../components/Layouts/AppNavbar'
import MonitoringTable from '../components/MonitoringTable'
import { io } from "socket.io-client"
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"
import {Bar, Line, Scatter, Bubble} from "react-chartjs-2"
import GaugeChart from "../components/Partials/GaugeChart"
import LineChart from '../components/Partials/LineChart'

const sampleSeries = [
  {
    name: 'MESHEDGE012301',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'MESHEDGE012302',
    data: [11, 32, 45, 32, 34, 52, 41]
  }
]

const sampleCategories = [
  "2018-09-19T00:00:00.000Z", 
  "2018-09-19T01:30:00.000Z", 
  "2018-09-19T02:30:00.000Z", 
  "2018-09-19T03:30:00.000Z", 
  "2018-09-19T04:30:00.000Z", 
  "2018-09-19T05:30:00.000Z", 
  "2018-09-19T06:30:00.000Z"
]

export default function Home() {
  // States
  const [message, setMessage] = useState([])
  const [logUrl, setLogUrl] = useState('http://localhost:6001')
  const [devices, setDevices] = useState([])
  const [cpuSeries, setCpuSeries] = useState(sampleSeries)
  const [cpuCategories, setCpuCategories] = useState(sampleCategories)

  // Mapping
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });
  const staticMap = useMemo(
    () => (
      <div id="map">
        <MapWithNoSSR 
          coors={message}
        />
      </div>
    ),
    [],
  )

  // Charting
  ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  )

  // Websockets
  const socket = io("http://localhost:6001", {
    withCredentials: true,
    transports: ["websocket"]
  })
  const topic = "server-topic"
  useEffect(() => {
    socket.on(topic, (data) => {
        setMessage(data)
        console.log(data)
    });
  }, [topic, socket]);

  // Initialize Data
  fetch(logUrl+"/logs")
    .then((res) => res.json())  
    .then((data) => {
      setMessage(data)
    })

  function filterLogs(id) {
    fetch(logUrl+"/logs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMessage(data)
      })
  }

  // Devices
  fetch(logUrl+"/devices")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setDevices(data)
    })


  return (
    <div style={{backgroundColor: "#fff"}}>
      <Navbar />
      <Container>
        <Head>
          <title>Pemantauan</title>
          <meta name="description" content="Pemantauan" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Spacer y={1} />
        <Grid.Container gap={2}>
          <Grid xs={5} direction="column">
          {staticMap}
          </Grid>
          <Grid xs={7} direction="column">    
            <Card css={{
              padding: ".5rem",
              marginBottom: ".5rem"
            }}>
              <Text h4 css={{textAlign: "center"}}>Statistik Edge Computing</Text>
              <Grid.Container gap={2}>
                <Grid xs={5}>
                  <Card variant="flat" css={{padding: ".5rem"}}>
                    <Text b h6>Spesifikasi</Text>
                    <Text>CPU : Intel(R) Celeron(R) CPU N3350 @ 1.1GHz (CPUs)</Text>
                    <Text>RAM : 6144MB</Text>
                    <Text>ROM : 222GB</Text>
                  </Card>
                </Grid>
                <Grid xs={7}>
                  <Grid.Container gap={2}>
                    <Grid xs={6}>
                      <GaugeChart name="CPU (%)" series="60" height="160"/>
                    </Grid>
                    <Grid xs={6}>
                      <GaugeChart name="RAM (%)" series="45" height="160"/>
                    </Grid>
                    <Grid xs={6}>
                      <GaugeChart name="Bandwidth (%)" series="40" height="160"/>
                    </Grid>
                    <Grid xs={6}>
                      <GaugeChart name="Battery (%)" series="40" height="160"/>
                    </Grid>
                  </Grid.Container>
                </Grid>
              </Grid.Container>
            </Card>
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2}>
            <Card css={{
              padding: ".5rem",
              marginBottom: ".5rem"
            }}>
              <Grid.Container gap={2} css={{
                padding: ".5rem"
              }}>
                <Grid xs={6} justify="flex-start">
                  <Text h4 css={{textAlign: "center"}}>Statistik IoT Node dalam jaringan </Text>
                </Grid>
                <Grid xs={6} justify="flex-end">
                  <Link href="/devices">
                    <Button bordered color="primary">Data IoT Nodes</Button>
                  </Link>
                </Grid>
              </Grid.Container>
              <Grid.Container gap={2}>
                <Grid xs>
                  <LineChart series={cpuSeries} height="200" categories={cpuCategories} name="CPU (Mhz)"/>
                </Grid>
                <Grid xs>
                  <LineChart series={cpuSeries} height="200" categories={cpuCategories} name="RAM (Kb)"/>
                </Grid>
                <Grid xs>
                  <LineChart series={cpuSeries} height="200" categories={cpuCategories} name="ROM (Kb)"/>
                </Grid>
                <Grid xs>
                  <LineChart series={cpuSeries} height="200" categories={cpuCategories} name="RSSI (dBm)"/>
                </Grid>
                <Grid xs>
                  <LineChart series={cpuSeries} height="200" categories={cpuCategories} name="Battery (V)"/>
                </Grid>
              </Grid.Container>
            </Card>
        </Grid.Container>
        <Spacer y={1} />
        <Grid.Container gap={2}>
          <Grid xs>
            <Radio.Group size="sm" orientation="horizontal" label="Filter" defaultValue={devices[0]?.name} >
              <Radio value="all" color="primary" size="sm" onClick={filterLogs("all")} selected>
                Semua
              </Radio>
              {devices?.map((item, index) => (
              <Radio value={item.name} color="primary" size="sm" onClick={filterLogs(item.name)}>
                {item.name}
              </Radio>
              ))}
            </Radio.Group>
          </Grid>
          <Grid xs={3}>
          </Grid>
          <Grid xs justify="flex-end">
            <Link href="http://localhost:6001/logs/downloadExcel" alignContent='flex-end'>
              <Button bordered color="success" auto>
                Export Excel
              </Button>
            </Link>
          </Grid>
        </Grid.Container>
        <Spacer y={1} />
        <Badge isSquared color="success" size="lg">
          Menampilkan 20 Data terbaru
        </Badge>
        <Spacer y={1} />
        <MonitoringTable data={message}/>
      </Container>
    </div>
  )
}
