import { Container, Table, Text, Button }  from "@nextui-org/react"
import { useEffect, useState } from "react"
import Modal from "../components/Partials/DeviceModal"

export default function DevicesTable({data}) {
    const [message, setMessage] = useState(data)
    const [selectedData, setSelectedData] = useState([])
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      setMessage(data)
      console.log(data)
    }, [data])
    
    const handleEdit = (id) => {
        setSelectedData(message.filter(item => item.id == id)[0])
        setVisible(true)
    }

    const handleDelete = (id) => {
        console.log("For Delete")
    }


    return (
        <>
            <Table
            aria-label="Example table with static content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            >
            <Table.Header>
                <Table.Column>Name</Table.Column>
                <Table.Column>CPU</Table.Column>
                <Table.Column>RAM</Table.Column>
                <Table.Column>ROM</Table.Column>
                <Table.Column>Bandwidth</Table.Column>
                <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
            { message !== null && message.length > 0 && message.map((item, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.cpu}</Table.Cell>
                    <Table.Cell>{item.ram}</Table.Cell>
                    <Table.Cell>{item.rom}</Table.Cell>
                    <Table.Cell>{item.bandwidth}</Table.Cell>
                    <Table.Cell>
                        <Button bordered color="primary" onClick={handleEdit(item.id)}>Edit</Button>
                        <Button bordered color="primary" onClick={handleDelete(item.id)}>Hapus</Button>
                    </Table.Cell>
                </Table.Row>
            )) }
            </Table.Body>
            </Table>
            <Modal data={selectedData} tipe="Edit" visible={visible}></Modal>
        </>
    )
}