import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from './Button';

import { LogOut } from './LogOut';

import { AuthContext, AuthContextInterface } from '../App';

const CustomizedLink = styled.h1`
    color: #FFF
`;

const CustomizedParagraph = styled.span`
    color: #FFF;
    margin-right: 10px;
`

export const Header = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext) as AuthContextInterface;

    return (
        <div style={{ background: 'black', display: 'flex', padding: '20px 40px', justifyContent: 'space-between' }}>
            <CustomizedLink>
                <Link to='/'>Home</Link>
            </CustomizedLink>


            <div style={{ display: 'flex', alignItems: 'center' }}>

                {user?.isAuthenticated && <CustomizedParagraph>Hi {user?.user?.firstname}</CustomizedParagraph>}

                {
                    !user.isAuthenticated ?
                        <Button
                            children='Login'
                            handleClick={() => navigate('/signin')}
                            style={{width: '100px', border: '1px solid #FFF'}}
                        /> :
                        <LogOut />
                }
            </div>

        </div>
    );
}

