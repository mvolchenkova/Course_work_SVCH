import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteToAllUsers = ({ children }) => {
    const currentUser = useSelector((state) => state.users.currentUser);

    if (currentUser && currentUser.role === 'admin') {
        return children; 
    }

    return <Navigate to="/" replace />; 
};

export default PrivateRouteToAllUsers;