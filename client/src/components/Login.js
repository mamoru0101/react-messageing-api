import {React, useRef} from 'react'

import { Container, Form, Button } from 'react-bootstrap'

import {v4 as uuidV4} from 'uuid'

const Login = ({onIdSubmit}) => {
  const idRef = useRef()
  function handlerSubmit(e){
    e.preventDefault();

    onIdSubmit(idRef.current.value);
  }
  function createNewId(){
    onIdSubmit(uuidV4())
  }

  return (
    <Container className="align-items-center d-flex" style={{height: '100vh'}}>
      <Form className="w-100" onSubmit={handlerSubmit}>
        <Form.Group>
          <Form.Label>Enter Your id</Form.Label>
          <Form.Control type="text" ref={idRef} required={true} />
        </Form.Group>
        <Button type="submit" className="mr-2">Login</Button>
        <Button onClick={createNewId} variant="secondary">Create A New Id</Button>
      </Form>
    </Container>
  )
}


export default Login