import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import {Link, useLocation} from "react-router-dom";

export function SigninScreen() {

const { search } = useLocation();
const redirectUrl = new URLSearchParams(search).get('redirect');
const redirect = redirectUrl ? redirectUrl : '/';

    return (

        <Container className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign In</h1>
            <Form>
                <FormGroup className="mb-3" controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" require></FormControl>
                </FormGroup>
                <FormGroup className="mb-3" controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" require></FormControl>
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