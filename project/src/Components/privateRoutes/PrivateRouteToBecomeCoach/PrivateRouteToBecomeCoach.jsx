import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteToBecomeCoach = ({ children }) => {
    const currentUser = useSelector((state) => state.users.currentUser);

    return currentUser ? children : <Navigate to="/authorization" />;
};

export default PrivateRouteToBecomeCoach;