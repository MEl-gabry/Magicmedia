import React, { useReducer, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

function Activate({ verify, isAuthenticated }) {
    const params = useParams();
    const [verified, setVerified] = useState(false);

    const verify_account = event => {
        const uid = params.uid;
        const token = params.token;

        verify(uid, token);
        setVerified(true);
    } 

    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    if (verified) {
        return <Navigate to='/login' />
    }
    
    return (
        <Container>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ marginTop: '200px'}}>
                <h1>Verify your Account</h1>
                <button
                    onClick={verify_account}
                    style={{marginTop: '50px'}}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </Container>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { verify })(Activate);