import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card, CardText } from "react-bootstrap";
import Message from '../components/Message';
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen( { match, history } ) {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    console.log('qty: ', qty);
    console.log("productId: ", id)
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log("cart ", cartItems)

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        console.log("remove item cart ", id)
        dispatch(removeFromCart(id))
    }

    const checkoutHander = () => {
        navigate(`/login?redirect=shipping`)
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping cart</h1>
                {
                    cartItems.length === 0 ? (
                        <Message variant='info'>
                            Your cart is empty <Link to='/'>Go back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {
                                cartItems.map(item => (
                                    <ListGroup.Item key={item.product}  >
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`} > {item.name} </Link>
                                            </Col>

                                            <Col md={2}>
                                                ${ item.price }
                                            </Col>

                                            <Col md={3}>
                                                <Form.Control
                                                    as = "select"
                                                    value={item.qty}
                                                    onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                                                >
                                                    {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>
                                                        {x+1}
                                                        </option>
                                                    ))
                                                    }
                                                </Form.Control>
                                            </Col>

                                            <Col md={1}>
                                                <Button 
                                                    type="button"
                                                    variant="light"
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>

            <Col md={4}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
                        $ {cartItems.reduce((acc,item) => acc + item.qty * item.price, 0)} 
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            type="button"
                            className="btn-block"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHander}
                        >
                            Proceed to checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
};

export default CartScreen;