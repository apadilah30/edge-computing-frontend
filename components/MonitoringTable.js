import { useState, useEffect } from "react"
import { Table } from "@nextui-org/react"
import { io } from "socket.io-client"
import { moment } from "moment"

export default function MonitoringTable({data}) {
    const [message, setMessage] = useState(data)
    
    useEffect(() => {
        setMessage(data)
    })
    
    return (
        <Table
        aria-label="Example table with static content"
        css={{
            height: "auto",
            minWidth: "100%",
        }}
        >
        <Table.Header>
            {/* <Table.Column>Time</Table.Column> */}
            <Table.Column>ID</Table.Column>
            <Table.Column>Latitude</Table.Column>
            <Table.Column>Longitude</Table.Column>
            <Table.Column>Altitude</Table.Column>
            <Table.Column>SOG</Table.Column>
            <Table.Column>COG</Table.Column>
            <Table.Column>Acc X</Table.Column>
            <Table.Column>Acc Y</Table.Column>
            <Table.Column>Acc Z</Table.Column>
            <Table.Column>Gyro X</Table.Column>
            <Table.Column>Gyro Y</Table.Column>
            <Table.Column>Gyro Z</Table.Column>
            <Table.Column>Mag X</Table.Column>
            <Table.Column>Mag Y</Table.Column>
            <Table.Column>Mag Z</Table.Column>
            <Table.Column>Roll</Table.Column>
            <Table.Column>Pitch</Table.Column>
            <Table.Column>Yaw</Table.Column>
            <Table.Column>Suhu(°C)  </Table.Column>
            <Table.Column>Rh(%)</Table.Column>
            <Table.Column>Light(%)</Table.Column>
            <Table.Column>VBat(V)</Table.Column>
            <Table.Column>Tail</Table.Column>
        </Table.Header>
        <Table.Body>
            {/* <Table.Cell>{moment(new Date(item.time)).format("YYYY-MM-DD HH:mm:ss")}</Table.Cell> */}
        { message !== null && message.length > 0 && message.map((item, index) => (
            <Table.Row key={index}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.lat}</Table.Cell>
                <Table.Cell>{item.lng}</Table.Cell>
                <Table.Cell>{item.alt}</Table.Cell>
                <Table.Cell>{item.sog}</Table.Cell>
                <Table.Cell>{item.cog}</Table.Cell>
                <Table.Cell>{item.accx}</Table.Cell>
                <Table.Cell>{item.accy}</Table.Cell>
                <Table.Cell>{item.accz}</Table.Cell>
                <Table.Cell>{item.gyrox}</Table.Cell>
                <Table.Cell>{item.gyroy}</Table.Cell>
                <Table.Cell>{item.gyroz}</Table.Cell>
                <Table.Cell>{item.magx}</Table.Cell>
                <Table.Cell>{item.magy}</Table.Cell>
                <Table.Cell>{item.magz}</Table.Cell>
                <Table.Cell>{item.roll}</Table.Cell>
                <Table.Cell>{item.pitch}</Table.Cell>
                <Table.Cell>{item.yaw}</Table.Cell>
                <Table.Cell>{item.suhu}</Table.Cell>
                <Table.Cell>{item.rh}</Table.Cell>
                <Table.Cell>{item.cahaya}</Table.Cell>
                <Table.Cell>{item.vbat}</Table.Cell>
                <Table.Cell>{item.tail}</Table.Cell>
            </Table.Row>
        )) }
        </Table.Body>
        </Table>
    )
}
