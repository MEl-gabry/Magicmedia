import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';

function ConfirmResetPassword({ reset_password_confirm }) {
    const params = useParams();
    const [requestSent, setRequestSent] = useState(false);
    const [inputField, setInputField] = useState({
        new_password: '',
        re_new_password: ''
    })

    const onChange = event => setInputField(inputField => ({...inputField, [event.target.id]: event.target.value}));
    const onSubmit = event => {
        event.preventDefault();

        const uid = params.uid;
        const token = params.token;

        reset_password_confirm(uid, token, inputField.new_password, inputField.re_new_password);
        setRequestSent(true);
    } 

    if (requestSent) {
        return <Navigate to="/" />
    }

    return (
        <Container className="centered">
            <h1>Reset Password</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="new_password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" onChange={onChange} placeholder="New Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="re_new_password">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" onChange={onChange} placeholder="Confirm New Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Reset Password
                </Button>
            </Form>
        </Container>
    );
}

export default connect(null, { reset_password_confirm })(ConfirmResetPassword);