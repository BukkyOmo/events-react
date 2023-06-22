import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { AuthContext, AuthContextInterface } from '../../App';
import Form from '../../components/Form';

// TODO: Error handling & persistent after login
export const SignIn: React.FC = (): JSX.Element => {

    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext) as AuthContextInterface;

    const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: 'all' });

    // TODO: create a toast that relays the api response on the UI
    const onSubmit = async user => {
        try {
            const response = await axios.post('http://localhost:8040/api/v1/auth/signin', user);
            const { data } = response.data;
            dispatch({
                type: 'LOGIN',
                payload: data
            });
            navigate('/')
        } catch (error) {
            console.log(error, 'error')
            // use a toast to show user of the error
            // update state: There should be login success, login error, login pending state
            console.log(error.response.data.error)
        }

    };

    return (
        <div className='form-container'>
            <Form
                handleSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'grid',
                    width: '500px',
                    marginTop: '200px',
                    border: '2px solid #000',
                    padding: '20px',
                }}
            >

                <h2>Sign In</h2>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // eslint-disable-line
                            message: 'Email must be valid.'
                        }
                    })}
                    id='email'
                    type='email'
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <span className='form-error' key={type}>{message}</span>
                        ))
                    }
                />
                <input
                    {...register('password', {
                        required: 'Password is required.',
                        pattern: {
                            value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                            message: "Password must contain an uppercase, lowercase, a number and a specail character."
                        },
                        minLength: {
                            value: 8,
                            message: 'Password must exceed 8 characters'
                        },
                        maxLength: {
                            value: 20,
                            message: "Password must not exceed 20 characters"
                        }
                    })}
                    id='password'
                    type='password'
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <span className='form-error' key={type}>{message}</span>
                        ))
                    }
                />
                <Button
                    children='Sign In'
                    type="submit"
                    style={{ width: '100%', border: '1px solid grey' }}
                />
            </Form>
        </div >
    )
}
