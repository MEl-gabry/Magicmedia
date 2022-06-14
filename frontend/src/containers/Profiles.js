import axios from 'axios';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ProfilePic from '../components/ProfilePic';
import styles from '../css/profiles.module.css';
import { config } from '../consts/consts';
import Button from 'react-bootstrap/esm/Button';

function Profiles({ user }) {

    const [profiles, setProfiles] = useState([]);

    const listProfiles = async () => {
        const res = await axios.get(`/api/profiles?email=${user.email}`, config);
        setProfiles(res.data.map(profile => <ProfilePic key={profile.id} profile={profile} />));
    };

    useEffect(() => {
        listProfiles();
    }, [user]);
    
    return (
        <div className="centerText fullHeight">
            <h1 className={styles.header}>Who's Watching?</h1>
            <div className="center fullHeight">
                { profiles }
                <Card style={{ width: '12rem', border: 'none', margin: 30 }}>
                    <Card.Img className="border" style={{ maxWidth: "12rem", maxHeight: 200 }} variant="top" src="/media/images/plus-button-icon.png" />
                    <Card.Body className="centerText">
                        <Card.Title>Add Profile</Card.Title>
                        <a className="stretched-link" href="/add-profile"></a>
                    </Card.Body>
                </Card>
            </div>
            <Button href="/manage-profiles" style={{ position: 'relative', bottom: "30%" }} variant="primary" size="lg">Manage Profiles</Button>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Profiles);