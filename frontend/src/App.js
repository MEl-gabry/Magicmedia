import React, { useState } from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import HomePage from "./containers/HomePage.js";
import Register from "./containers/Register.js";
import Login from "./containers/Login.js";
import ResetPassword from "./containers/ResetPassword.js";
import Activate from "./containers/Activate.js";
import ConfirmResetPassword from "./containers/ConfirmResetPassword.js";

import { Provider } from 'react-redux';
import store from "./store.js";

import Layout from "./hocs/Layout.js";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route exact path='/' element={<HomePage />}></Route>
                        <Route path='register' element={<Register />}></Route>
                        <Route path='login' element={<Login />}></Route>
                        <Route path='reset-password' element={<ResetPassword />}></Route>
                        <Route path='password/reset/confirm/:uid/:token' element={<ConfirmResetPassword />}></Route>
                        <Route path='activate/:uid/:token' element={<Activate />}></Route>
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);