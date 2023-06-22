import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextInterface } from 'App';
import { Button } from './Button';
import '../App.css';

export const LogOut: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext) as AuthContextInterface;

    const handleLogOut = () => {
        dispatch({
            type: 'LOGOUT'
        })
        navigate('/');
    }
    return (
        <div>
            <Button
                children='Log Out'
                handleClick={handleLogOut}
                style={{ marginLeft: '5px' }}
            />
        </div>
    )
}
