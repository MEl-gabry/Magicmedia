import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

function Register({ signup, isAuthenticated }) {
    const [accountCreated, setAccountCreated] = useState(false);
    const [inputField, setInputField] = useState({
        username: '',
        email: '',
        password: '',
        re_password: ''
    });

    const onChange = event => setInputField(inputField => ({...inputField, [event.target.id]: event.target.value})); 
    const onSubmit = event => {
        event.preventDefault();

        if (inputField.password === inputField.re_password) {
            signup(inputField.username, inputField.email, inputField.password, inputField.re_password);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    if (accountCreated) {
        return <Navigate to='/login' />
    }

    return (
        <Container className="centered">
            <h1>Signup</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" onChange={onChange} placeholder="Username*" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={onChange} placeholder="Email*" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                 </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={onChange} placeholder="Password*" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="re_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" onChange={onChange} placeholder="Confirm Password*" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Signup
                </Button>
            </Form>
            <p>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Container>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Register);