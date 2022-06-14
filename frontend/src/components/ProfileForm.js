import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Button from 'react-bootstrap/esm/Button';
import { connect } from "react-redux";
import { config } from '../consts/consts';
import Form from 'react-bootstrap/Form';

function ProfileForm({ user, profile }) {

    const [response, setResponse] = useState({
        message: '',
        error: false
    });

    const [imageURL, setImageURL] = useState('');

    const [inputField, setInputField] = useState({
        name: '',
        image: '',
    });

    const updateProfile = async (name, image) => {
        const body = new FormData();
        body.append('image', image);
        body.append('id', profile.id);
        body.append('name', name);
        body.append('user', user);
        try {
            await axios.put('/api/update-profile', body, config);
            setResponse({message: 'Profile successfully updated!', error: false});
        } catch(err) {
            setResponse({message: 'There was an error in updating the profile', error: true});
            console.log(err.message);
        }
    };

    const onChange = event => setInputField(inputField => ({...inputField, [event.target.id]: event.target.value})); 
    const imageChange = event => {
        setImageURL(URL.createObjectURL(event.target.files[0]));
        setInputField(inputField => ({...inputField, image: event.target.files[0]}));
    }
    const onSubmit = event => {
        event.preventDefault();

        updateProfile(inputField.name, inputField.image);
    };

    useEffect(() => {
        setInputField(inputField => ({...inputField, name: profile.name}));
        setImageURL(profile.image);
    }, [profile]);  

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label style={{ fontWeight: "bold", fontSize: 30, marginRight: "40%", marginBottom: 20 }}>Profile Name</Form.Label>
                <Form.Control type="text" onChange={onChange} value={inputField.name} style={{ maxWidth: 1000, maxHeight: 200 }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
                <Form.Label style={{ fontWeight: "bold", fontSize: 30, marginRight: "40%" }}>Profile Image</Form.Label>
                <img style={{ maxWidth: "12rem", maxHeight: 200, margin: 20, marginRight: "40%" }} src={imageURL ? imageURL : "/media/images/default_profile.jpg"} />
                <Form.Control type="file" onChange={imageChange} accept="image/png, image/jpeg" style={{ maxWidth: 1000, maxHeight: 200 }} />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginRight: "40%" }}>
                Update Profile
            </Button>
            { response.message && <p className={response.error ? "text-danger" : "text-success"}>{ response.message }</p>}
        </Form>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user.id
});

export default connect(mapStateToProps)(ProfileForm);