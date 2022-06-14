import React, { useReducer, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import { config } from '../consts/consts';
import axios from "axios";

function AddProfile({ user }) {
    const [error, setError] = useState(false);
    
    const [profileCreated, setProfileCreated] = useState(false);
    
    const [inputField, setInputField] = useState({
        name: '',
        image: ''
    });

    const createProfile = async (name, image) => {
        const body = new FormData();
        body.append('image', image);
        body.append('name', name);
        body.append('user', user);
        try {
            await axios.post('/api/create-profile', body, config);
            setProfileCreated(true);
        } catch(err) {
            setError(true);
            console.log(err.message);
        }
    };

    const onChange = event => setInputField(inputField => ({...inputField, [event.target.id]: event.target.value})); 
    const imageChange = event => setInputField(inputField => ({...inputField, image: event.target.files[0]}));
    const onSubmit = event => {
        event.preventDefault();

        createProfile(inputField.name, inputField.image);
    };

    if (profileCreated) {
        return <Navigate to='/profiles' />
    }

    return (
        <Container className="centered">
            <h1>Add Profile</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={onChange} placeholder="Name*" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image" >
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={imageChange} accept="image/png, image/jpeg" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
                {error && <p className="text-danger">There was an error in creating the profile!</p>}
            </Form>
            <Link to='/profiles'>Return to Profiles</Link>
        </Container>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user.id
});

export default connect(mapStateToProps)(AddProfile);