import React, { useReducer, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

function Register() {

    const [inputField, setInputField] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: ''
    })

    const onChange = event => setInputField({...inputField, [event.target.id]: event.target.value}); 
    const onSubmit = event => {
        event.preventDefault();
    };

    return (
        <Container className="centered">
            <h1>Enter the fields below to register!</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" onChange={onChange} placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={onChange} placeholder="Email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                 </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={onChange} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password_confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" onChange={onChange} placeholder="Password Again" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>
                Already have an account?
            </p>
        </Container>
    );
}

export default Register;