import React, { useContext } from 'react';
import { AuthContext, AuthContextInterface } from 'App';
import { Navigate } from 'react-router-dom';

// HOC
export const RequiredAuth = ({ children }) => {
    const { user } = useContext(AuthContext) as AuthContextInterface;

    if (!user.isAuthenticated) {
        return <Navigate to='/signin' />
    }

    return children;
}
