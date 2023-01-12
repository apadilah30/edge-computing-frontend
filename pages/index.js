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
  const [logUrl, setLogUrl] = useState('http://192.168.1.32:6001')
  const [devices, setDevices] = useState([])
  const [specification, setSpecification] = useState([])
  const [selectedDevice, setSelectedDevice] = useState("all")
  const [chartSeries, setChartSeries] = useState({
    cpu : sampleSeries,
    ram : sampleSeries,
    rom : sampleSeries,
    rssi : sampleSeries,
    battery : sampleSeries
  })
  const [chartCategories, setChartCategories] = useState({
    cpu : sampleCategories,
    ram : sampleCategories,
    rom : sampleCategories,
    rssi : sampleCategories,
    battery : sampleCategories
  })

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
  useEffect(() => {
    const socket = io("http://192.168.1.32:6001", {
      withCredentials: true,
      transports: ["websocket"]
    })
    socket.connect()
    const topic = "server-topic"
    // socket.on(topic, (value) => {
    //     let data = value;
    //     // if(selectedDevice != 'all'){
    //     //   data = value.filter(x => x.uuid == selectedDevice)
    //     // }
    //     setMessage(data)
    //     setChartSeries({
    //       cpu : data.map(x => x.cpu),
    //       ram : data.map(x => x.ram),
    //       rom : data.map(x => x.rom),
    //       rssi : data.map(x => x.rssi),
    //       battery : data.map(x => x.vbat)
    //     })
    //     setChartCategories({
    //       cpu : data.map(x => x.timestamp),
    //       ram : data.map(x => x.timestamp),
    //       rom : data.map(x => x.timestamp),
    //       rssi : data.map(x => x.timestamp),
    //       battery : data.map(x => x.timestamp)
    //     })
    //     // console.log(data)
    // });
  }, []);

  // Initialize Data
  function loadLogs(id){
    fetch(logUrl+"/logs?id="+id)
      .then((res) => res.json())  
      .then((value) => {
        setMessage(value)
      })
  }

  loadLogs(selectedDevice)

  // Devices
  fetch(logUrl+"/devices")
    .then((res) => res.json())
    .then((data) => {
      let result = []
      data.forEach(element => {
        fetch(logUrl+"/logs?id="+element.name)
          .then((res) => res.json())  
          .then((data) => {
            let cpuSeriesTemp = [{
                  name: element.name,
                  data: data.map(x => x.cpu)
                }],
                ramSeriesTemp = [{
                  name: element.name,
                  data: data.map(x => x.ram)
                }],
                romSeriesTemp = [{
                  name: element.name,
                  data: data.map(x => x.rom)
                }],
                rssiSeriesTemp = [{
                  name: element.name,
                  data: data.map(x => x.rssi)
                }],
                batterySeriesTemp = [{
                  name: element.name,
                  data: data.map(x => x.vbat)
                }]

            result.push({...element,...{chart: {
              cpu : cpuSeriesTemp,
              ram : ramSeriesTemp,
              rom : romSeriesTemp,
              rssi : rssiSeriesTemp,
              battery : batterySeriesTemp,
              datetime : data.map(x => x.timestamp)
            }}})
          })
          .finally(() => {
            setDevices(result)
          })
      });
    })

  // Device Specification
  fetch(logUrl+"/api/server-status")
    .then((res) => res.json())
    .then((data) => {
      setSpecification(data)
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
                    <Text>CPU : {specification?.specification?.cpu}</Text>
                    <Text>Cores : {specification?.specification?.cpu_count}</Text>
                    <Text>Platform : {specification?.specification?.cpu_count}</Text>

                    <Text>Memory (RAM)</Text>
                    <Text>Total : {parseFloat(parseInt(specification?.statistics?.total_ram)/ (1000*1000)).toFixed(2)} MB</Text>
                    <Text>Used : {parseFloat(parseFloat(parseInt(specification?.statistics?.total_ram)/ (1000*1000)).toFixed(2)-parseFloat(parseInt(specification?.statistics?.free_ram)/ (1000*1000)).toFixed(2)).toFixed(2)} MB</Text>
                    <Text>Free : {parseFloat(parseInt(specification?.statistics?.free_ram)/ (1000*1000)).toFixed(2)} MB</Text>
                  </Card>
                </Grid>
                <Grid xs={7}>
                  <Grid.Container gap={2}>
                    <Grid xs={6}>
                      <GaugeChart name="CPU (%)" series={parseInt(specification?.statistics?.cpu_percent)} height="160"/>
                    </Grid>
                    <Grid xs={6}>
                      <GaugeChart name="RAM (%)" series={parseInt(specification?.statistics?.ram_percent)} height="160"/>
                    </Grid>
                    <Grid xs={6}>
                      <GaugeChart name="Bandwidth (%)" series="48" height="160"/>
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
            </Card>
        </Grid.Container>
        { devices !== null && devices.length > 0 && devices.map((item, index) => (
          <Grid.Container gap={2}>
              <Card css={{
                padding: ".5rem",
                marginBottom: ".5rem"
              }}>
                <Text h6 b>Device ID : {item.name}</Text>
                <Grid.Container gap={2}>
                  <Grid xs>
                    <LineChart series={item.chart?.cpu} height="200" categories={item.chart?.datetime} name="CPU (Mhz)"/>
                  </Grid>
                  <Grid xs>
                    <LineChart series={item.chart?.ram} height="200" categories={item.chart?.datetime} name="RAM (Kb)"/>
                  </Grid>
                  <Grid xs>
                    <LineChart series={item.chart?.rom} height="200" categories={item.chart?.datetime} name="ROM (Kb)"/>
                  </Grid>
                  <Grid xs>
                    <LineChart series={item.chart?.rssi} height="200" categories={item.chart?.datetime} name="RSSI (dBm)"/>
                  </Grid>
                  <Grid xs>
                    <LineChart series={item.chart?.battery} height="200" categories={item.chart?.datetime} name="Battery (V)"/>
                  </Grid>
                </Grid.Container>
              </Card>
          </Grid.Container>
        ))}
        <Spacer y={1} />
        <Grid.Container gap={2}>
          <Grid xs>
            <Radio.Group 
              size="sm" 
              orientation="horizontal" 
              label="Filter"
              defaultValue="all" 
              value={selectedDevice}
              onChange={setSelectedDevice}
              >
              <Radio value="all" color="primary" size="sm">
                Semua
              </Radio>
              {devices?.map((item, index) => (
              <Radio value={item.name} color="primary" size="sm">
                {item.name}
              </Radio>
              ))}
            </Radio.Group>
          </Grid>
          <Grid xs={3}>
          </Grid>
          <Grid xs justify="flex-end">
            <Link href="http://192.168.1.32:6001/logs/downloadExcel" alignContent='flex-end'>
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
