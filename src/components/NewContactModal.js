import React, {useRef} from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const NewContactModal = ({closeModal}) => {
  const idRef = useRef();
  const nameRef = useRef();


  function handleSubmit(e){
    e.preventDefault();
    // createContact(idRef.cuurent.value, )
    closeModal()
  }


  return (
    <>
      <Modal.Header closeButton>
        Create Contact
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewContactModal
