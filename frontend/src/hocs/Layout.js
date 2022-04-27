import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import Sidebar from '../components/Sidebar';

function Layout(props) {
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, []);
    
    return (
        <div>
            { props.isAuthenticated && <Sidebar />}
            {props.children}
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated, load_user })(Layout)