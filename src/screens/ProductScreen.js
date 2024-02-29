import React, {useState, useEffect} from 'react';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate , useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import {listProductDetails} from '../actions/productActions'; 
import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductScreen() {
  const { id } = useParams()
  const navigate = useNavigate();
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)   
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go back
      </Link>

      {loading ? 
        <Loader />
        : error ? <Message variant='danger'> {error}</Message>
        : (
          <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.image} fluid />
          </Col>
  
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}></Rating>
              </ListGroup.Item>
  
              <ListGroup.Item>
                Price : ${product.price}
              </ListGroup.Item>
  
              <ListGroup.Item>
                Description : ${product.description}
              </ListGroup.Item>
            </ListGroup>
  
          </Col>
  
          <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col> Price: </Col>
                <Col>
                  <strong>$ {product._id}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
  
            <ListGroup.Item>
              <Row>
                <Col> Status: </Col>
                <Col>
                  <strong>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
                </Col>
              </Row>
            </ListGroup.Item>  
            {
              product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col className='my-1'>
                      <Form.Control
                        as = "select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {
                          [...Array(product.countInStock).keys()].map((x) => (
                            <option key={x+1} value={x+1}>
                              {x+1}
                            </option>
                          ))
                        }
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            }
            
            <ListGroup.Item>
              <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0} type='button'>Add to cart</Button>
            </ListGroup.Item>
            
          </ListGroup>
          
  
          </Col>
        </Row>
        )
      }
    </div>
  );
}

export default ProductScreen;
