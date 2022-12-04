import React, {useContext, useReducer, useState} from 'react';
import {Store} from "../Store";
import {Helmet} from "react-helmet-async";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {toast} from "react-toastify";
import {getError} from "../utils";
import axios from "axios";

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false }
        default:
            return state;
    }
}

export default function ProfileScreen() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/user/profile', {
                name, email, password
            },
                {
                    headers: { authorization: userInfo.token }
                });
            dispatch({type: 'UPDATE_SUCCESS'});
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully')
        } catch (error) {
            dispatch({ type: 'FETCH_FAIL' });
            toast.error(getError(error));
        }
    }

    return (
        <div className="container small-container">
            <Helmet><title>User Profile</title></Helmet>
            <h1>User Profile</h1>
            <form onSubmit={submitHandler}>
                <FormGroup className="mb-3" controlId="name">
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    >
                    </FormControl>
                </FormGroup>
                <FormGroup className="mb-3" controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></FormControl>
                </FormGroup>
                <FormGroup className="mb-3" controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup className="mb-3" controlId="password">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <div className="mb-3">
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </div>
    );
}