import React, { useState } from "react";
import { connect } from "react-redux";
import store from "../store.js";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const [page, setPage] = useState(null);
    
    setTimeout(() => setPage(store.getState().auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />), 300);

    return page
}

export default PrivateRoute;