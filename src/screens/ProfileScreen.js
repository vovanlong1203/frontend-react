import React, { useState, useEffect } from "react";
import { Link, redirect, useParams, useLocation, useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Form, Button, Row, Col} from 'react-bootstrap';
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const location = useLocation()
    const history = useNavigate()

    const userDetail = useSelector(state => state.userDetail)
    const { error, loading, user } = userDetail

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect( () => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserProfile('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            
            }
        }

    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            console.log('Password do not match')
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id ,
                'name': name,
                'email': email,
                'password': password
            }))
            console.log("update...")
            setMessage('')
        }
    }


    return (
        <Row>
            <Col md={3}>
                <h2>User profile</h2>

                { message && <Message variant='danger'> {message} </Message> }
                { error && <Message variant='danger'> {error} </Message> }
                {loading && <Loader />}
    
                <Form onSubmit={submitHandler}>
                
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
    
                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
    
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My orders</h2>
            </Col>

        </Row>

    )
}

export default ProfileScreen
