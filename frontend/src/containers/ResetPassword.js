import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';

function ResetPassword({ reset_password }) {
    const [requestSent, setRequestSent] = useState(false);
    const [email, setEmail] = useState('');

    const onChange = event => setEmail(event.target.value); 
    const onSubmit = event => {
        event.preventDefault();

        reset_password(email);
        setRequestSent(true);
    } 

    if (requestSent) {
        return <Navigate to="/" />
    }

    return (
        <Container className="centered">
            <h1>Reset Password</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={onChange} placeholder="Email" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Reset Password
                </Button>
            </Form>
        </Container>
    );
}

export default connect(null, { reset_password })(ResetPassword);