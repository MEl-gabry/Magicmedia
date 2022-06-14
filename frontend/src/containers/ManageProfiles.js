import axios from 'axios';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import ListGroup from 'react-bootstrap/ListGroup';
import { config } from '../consts/consts';

function ManageProfiles({ user }) {

    const [profileForm, setProfileForm] = useState('');

    const [profileList, setProfileList] = useState([]);

    const getProfile = async id => {
        const res = await axios.get(`/api/profile?email=${user.email}&id=${id}`, config);
        setProfileForm(<ProfileForm profile={res.data}></ProfileForm>);
    }

    const listProfiles = async () => {
        const res = await axios.get(`/api/profiles?email=${user.email}`, config);
        const data = res.data;
        setProfileList(data.map(profile => <ListGroup.Item action key={profile.id} id={profile.id} style={{ paddingTop: 50, paddingBottom: 50, maxWidth: 500 }} onClick={onClick}>{profile.name}</ListGroup.Item>));
        getProfile(data[0].id);
    };

    const onClick = e => {
        getProfile(e.target.id);
    };

    useEffect(() => {
        listProfiles();
    }, [user])
    
    return (
        <div className="centerText fullHeight">
            <ListGroup className="w-25 h-50" style={{ marginTop: "5%", marginLeft: "10%", float: "left", display: "flex", flexDirection: "column" }}>
                {profileList}
            </ListGroup>
            <h1 style={{ top: "10%", position: "relative", marginRight: "26%" }}>Manage Profile</h1>
            <div className="center" style={{ display: "flex", flexDirection: "column", alignItems: "stretch", marginTop: 200 }}>
                {profileForm}
            </div>
            <Link to="/profiles" style={{ top: "10%", position: "relative", marginRight: "26%" }}>Return to profiles</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(ManageProfiles);