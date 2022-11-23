import React from 'react'
import { useParams } from 'react-router-dom'
import {useEffect, useReducer} from "react";
import {Badge, Button, Card, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Rating} from "../components/Rating";
import {Helmet} from "react-helmet-async";

const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const ProductScreen = () => {

    const { slug } = useParams()

    const [{loading, error, product}, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    });

    useEffect(() => {

        const fetchData = async () => {

            dispatch({ type: 'FETCH_REQUEST'});

            try {
                const result = await fetch(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: await result.json()})
            }
            catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        };
        fetchData()

    },[slug])

  return (
      loading ? <div>Loading...</div>
          : error ? <div>{error}</div>
          : <div>
                  <Row>
                      <Col md={6}>
                          <img
                              className="img-large"
                              src={product.image}
                              alt={product.name}
                          />
                      </Col>
                      <Col md={3}>
                          <ListGroup variant="flush">
                              <ListGroupItem>
                                  <Helmet>
                                    <title>{product.name}</title>
                                  </Helmet>
                                  <h1>{product.name}</h1>
                              </ListGroupItem>
                              <ListGroupItem>
                                  <Rating
                                      rating={product.rating}
                                      numReviews={product.numReviews}
                                  />
                              </ListGroupItem>
                              <ListGroupItem>
                                  Price: ${product.price}
                              </ListGroupItem>
                              <ListGroupItem>
                                  Description: <p>{product.description}</p>
                              </ListGroupItem>
                          </ListGroup>
                      </Col>
                      <Col md={3}>
                          <Card>
                              <Card.Body>
                                  <ListGroup variant="flush">
                                      <ListGroupItem>
                                          <Row>
                                              <Col>Price:</Col>
                                              <Col>${product.price}</Col>
                                          </Row>
                                      </ListGroupItem>
                                      <ListGroupItem>
                                          <Row>
                                              <Col>Status:</Col>
                                              <Col>{product.countStock > 0 ?
                                              <Badge bg="success">In Stock</Badge>
                                                  : <Badge bg="danger">Unavailable</Badge>
                                              }</Col>
                                          </Row>
                                      </ListGroupItem>

                                      {product.countStock > 0 && (<ListGroupItem>
                                          <div className="d-grid">
                                              <Button variant="primary">
                                                  Add to Cart
                                              </Button>
                                          </div>
                                      </ListGroupItem>)}

                                  </ListGroup>
                              </Card.Body>
                          </Card>
                      </Col>
                  </Row>
                  {product.name}
    </div>
  )
}
