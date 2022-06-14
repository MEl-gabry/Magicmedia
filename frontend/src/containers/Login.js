import React, { useReducer, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

function Login({ login, isAuthenticated }) {

    const [inputField, setInputField] = useState({
        email: '',
        password: ''
    });

    const onChange = event => setInputField(inputField => ({...inputField, [event.target.id]: event.target.value})); 
    const onSubmit = event => {
        event.preventDefault();

        login(inputField.email, inputField.password);
    };

    if (isAuthenticated) {
        return <Navigate to='/profiles' />
    }
    
    return (
        <Container className="centered">
            <h1>Login</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email/Username</Form.Label>
                    <Form.Control type="text" onChange={onChange} placeholder="Email/Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={onChange} placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
            <p>
                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
            </p>
        </Container>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);