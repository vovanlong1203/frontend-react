import React, {useState, useEffect} from "react";
import { Link, redirect, useParams, useLocation, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen({}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const location = useLocation()
    const history = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    console.log("userInfo: ", userInfo)
    console.log("error: ", error)
    console.log("loading: ", loading)

    useEffect( () => {
        if (userInfo) 
            history(redirect)
    }, [history, userInfo, redirect])

    const submitHander = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        console.log("Submited")
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            { error && <Message variant='danger'> {error} </Message> }
            {loading && <Loader />}
            <Form onSubmit={submitHander}>
                <Form.Group controlId="email">
                    <Form.Label>
                        Email address
                    </Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">Sign In</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer? 
                    <Link 
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}    
                    >
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen