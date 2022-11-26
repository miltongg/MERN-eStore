import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {Store} from "../Store";
import {toast} from "react-toastify";
import {getError} from "../utils";

export function SignupScreen() {
    const navigate = useNavigate();

    const {search} = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {state, dispatch: ctxDispatch} = useContext(Store);

    const { userInfo } = state;



    const submitHandler = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Paswords do not match');
            return
        }

        try {

            const {data} = await axios.post('/api/user/signup', {
                name,
                email,
                password,
                confirmPassword
            });

            ctxDispatch({type: 'USER_SIGNIN', payload: data})

            localStorage.setItem('userInfo', JSON.stringify(data))

            navigate(redirect || '/')

        } catch (error) {
            toast.error(getError(error))
        }

    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    return (

        <Container className="small-container">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={submitHandler}>

                <FormGroup className="mb-3" controlId="name">
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup className="mb-3" controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup className="mb-3" controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup className="mb-3" controlId="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <div className="mb-3">
                    <Button type="submit">Sign Up</Button>
                </div>

                <div className="mb-3">
                    Already have an account?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>

            </Form>
        </Container>

    )

}