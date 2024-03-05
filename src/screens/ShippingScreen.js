import React, {useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const history = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        console.log("submit")
        history('/payment')
    }

    return (
        <FormContainer>

            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>

            <Form onSubmit={submitHandler}>

                <Form.Group controlId="address">
                    <Form.Label> Name </Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder="Enter address"
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label> City </Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder="Enter city"
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label> postalCode </Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder="Enter postalCode"
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label> country </Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder="Enter country"
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>

            </Form>


        </FormContainer>
    )
}

export default ShippingScreen