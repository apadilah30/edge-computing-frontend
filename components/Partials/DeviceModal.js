import { useState, useEffect } from "react"
import { Modal, Text, Input, Row, Button } from "@nextui-org/react"

export default function DeviceModal({ data, tipe, visible }) {
    const [dataModal, setDataModal] = useState(data)
    const [tipeModal, setTipeModal] = useState(tipe)
    const [visibleModal, setVisibleModal] = useState(visible)

    const closeHandler = () => {
        setVisible(false);
    };

    return (
        <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visibleModal}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {tipeModal} Data 
            <Text b size={18}>
                IoT Node
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={closeHandler}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    )
}