import React from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import HomePage from "./containers/HomePage.js";
import Register from "./containers/Register.js";
import Login from "./containers/Login.js";
import ResetPassword from "./containers/ResetPassword.js";
import Activate from "./containers/Activate.js";
import ConfirmResetPassword from "./containers/ConfirmResetPassword.js";
import Profiles from "./containers/Profiles.js";
import AddProfile from "./containers/AddProfile.js";
import PrivateRoute from "./components/PrivateRoute.js";
import ManageProfiles from "./containers/ManageProfiles.js";

import { Provider } from 'react-redux';
import store from "./store.js";
import { checkAuthenticated, load_user } from "./actions/auth.js";

import Layout from "./hocs/Layout.js";

store.dispatch(dispatch => {
    dispatch(checkAuthenticated());
    dispatch(load_user());
});

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path='register' element={<Register />}></Route>
                        <Route path='login' element={<Login />}></Route>
                        <Route path='reset-password' element={<ResetPassword />}></Route>
                        <Route path='password/reset/confirm/:uid/:token' element={<ConfirmResetPassword />}></Route>
                        <Route path='activate/:uid/:token' element={<Activate />}></Route>
                        <Route element={<PrivateRoute />}>
                            <Route exact path='/' element={<HomePage />}></Route>
                            <Route path='profiles' element={<Profiles />}></Route>
                            <Route path='add-profile' element={<AddProfile />}></Route>
                            <Route path='manage-profiles' element={<ManageProfiles />}></Route>
                        </Route>
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);