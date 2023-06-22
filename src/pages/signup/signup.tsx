import React from 'react';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Button } from '@mui/material';
import Form from '../../components/Form';
import './signup.css';

// :TODO: Add toast to project server error
export const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });

    const submit = data => {
        console.log(data)
        axios.post('http://localhost:8040/api/v1/auth/signup', data)
            .then(response => console.log('Signup successful.', response))
            .catch(error => console.log(error.response.data.error))
    };

    return (
        <div className='form-container'>
            <Form
                handleSubmit={handleSubmit(submit)}
                style={{
                    display: 'grid',
                    width: '500px',
                    marginTop: '200px',
                    border: '2px solid #000',
                    padding: '20px',
                }}
            >
                <h2>Sign Up</h2>
                <input
                    id='firstname'
                    type='name'
                    {...register('firstname',
                        {
                            required: "First name is required.",
                            pattern: {
                                value: /^[A-Za-z]+$/i,
                                message: "First name is letters only."
                            },
                            minLength: {
                                value: 3,
                                message: "First name must exceed 3 characters"
                            }
                        })}

                />
                <ErrorMessage
                    errors={errors}
                    name="firstname"
                    render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                            ? Object.entries(messages).map(([type, message]) => (
                                <span className='form-error' key={type}>{message}</span>
                            ))
                            : null;
                    }}
                />
                <input
                    id='lastname'
                    type='name'
                    {...register('lastname', {
                        required: "Lastname is required.",
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Last name is letters only."
                        },
                        minLength: {
                            value: 3,
                            message: "Last name must exceed 3 characters"
                        }
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="lastname"
                    render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                            ? Object.entries(messages).map(([type, message]) => (
                                <span className='form-error' key={type}>{message}</span>
                            ))
                            : null;
                    }}
                />
                <input
                    // name='email'
                    id='email'
                    type='email'
                    {...register('email', {
                        required: "Email is required.",
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // eslint-disable-line
                            message: "Email must be valid."
                        }
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                            ? Object.entries(messages).map(([type, message]) => (
                                <span className='form-error' key={type}>{message}</span>
                            ))
                            : null;
                    }}
                />
                <input
                    // name='password'
                    id='password'
                    type='password'
                    {...register('password', {
                        required: "Password is required.",
                        pattern: {
                            value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                            message: "Password must contain an uppercase, lowercase, a number and a specail character."
                        },
                        minLength: {
                            value: 8,
                            message: "Password must exceed 8 characters"
                        },
                        maxLength: {
                            value: 20,
                            message: "Password must not exceed 20 characters"
                        }
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ messages }) => {
                        console.log("messages", messages);
                        return messages
                            ? Object.entries(messages).map(([type, message]) => (
                                <span className='form-error' key={type}>{message}</span>
                            ))
                            : null;
                    }}
                />
                <Button
                    children='Submit'
                    type="submit"
                    style={{
                        width: '100%',
                        border: '1px solid grey',
                        background: 'black',
                        color: '#FFF',
                        marginTop: '10px',
                        padding: '10px'
                    }}
                />
            </Form>
        </div>
    )
}
