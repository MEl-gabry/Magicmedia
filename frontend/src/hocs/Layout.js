import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

function Layout(props) {    
    return (
        <div className="fullHeight">
            { props.isAuthenticated && <Sidebar /> }
            {props.children}
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Layout)