import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {Store} from "../Store";
import {toast} from "react-toastify";
import {getError} from "../utils";

export function SigninScreen() {
    const navigate = useNavigate();

    const {search} = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {state, dispatch: ctxDispatch} = useContext(Store);

    const { userInfo } = state;



    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            const {data} = await axios.post('/api/user/signin', {
                email,
                password
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
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
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
                <div className="mb-3">
                    <Button type="submit">Sign In</Button>
                </div>
                <div className="mb-3">
                    New customer?{' '}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
        </Container>

    )

}