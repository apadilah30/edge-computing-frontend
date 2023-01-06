import Head from 'next/head'
import React, {useState, useEffect, useMemo} from 'react'
import { Container, Spacer, Link, Button, Grid, Radio, Text, Card, Badge } from '@nextui-org/react'
import Navbar from "../components/Layouts/AppNavbar"
import DevicesTable from '../components/DevicesTable'

const baseUrl = "http://localhost:6001"
export default function Devices() {
    const [data, setData] = useState([])

    fetch(baseUrl+"/devices")
        .then((res) => res.json())
        .then((res) => {
            setData(res)
        })
    

    return (    
        <div style={{backgroundColor: "#fff"}}>
            <Navbar />
            <Container>
                <Head>
                <title>Data IoT Nodes</title>
                <meta name="description" content="Data IoT Nodes" />
                <link rel="icon" href="/favicon.ico" />
                </Head>
                <Spacer y={1} />
                <Button bordered color="primary">
                    Tambah Data
                </Button>
                <Spacer y={1} />
                <DevicesTable data={data}/>
            </Container>
        </div>
    )
}