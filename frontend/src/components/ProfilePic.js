import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { load_profile } from "../actions/auth";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function ProfilePic({ profile, user }) {

    const [loaded, setLoaded] = useState(false);

    const onClick = e => {
        e.preventDefault();
        load_profile(e.target.id, user.email);
        setLoaded(true);
    };

    if (loaded) {
        return <Navigate to="/" />
    }

    return (
        <Card style={{ width: '12rem', border: 'none', margin: 30 }}>
            <Card.Img className="border" style={{ maxWidth: "12rem", maxHeight: 200 }} variant="top" src={profile.image ? profile.image : "/media/images/default_profile.jpg"} />
            <Card.Body className="centerText">
                <Card.Title>{ profile.name }</Card.Title>
                <a className="stretched-link" id={profile.id} href="/" onClick={onClick}></a>
            </Card.Body>
        </Card>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { load_profile })(ProfilePic);