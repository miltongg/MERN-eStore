import React, { useEffect, useReducer } from 'react'
import logger from 'use-reducer-logger';
import {Col, Row} from "react-bootstrap";
import {Product} from "../components/Product";
import {Helmet} from "react-helmet-async";


const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export const HomeScreen = () => {

    const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
    });

    useEffect(() => {

        const fetchData = async () => {  

            dispatch({ type: 'FETCH_REQUEST'});

            try {
                const result = await fetch('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: await result.json()})
            }
            catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        };

        fetchData()

    },[])

  return (
    <div>

        <Helmet>
            <title>eStore</title>
        </Helmet>

        <h1>Featured Products</h1>

        <div className="products">
        {
            loading ? <div>Loading...</div>
            : error ? <div>{error}</div>
            : (
            <Row>
            {
            products.map(product => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product} />
                </Col>
            ))}
            </Row>
        )}
        </div>
    
    </div>
  )
}
