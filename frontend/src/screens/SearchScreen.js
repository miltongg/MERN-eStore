import axios from 'axios';
import React, { useReducer, useState } from 'react'
import { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { Product } from '../components/Product';
import { Rating } from '../components/Rating';
import { getError } from '../utils';

const reducer = (state, action) => {

    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        
        case 'FETCH_SUCCESS':
            return { ...state, 
                products: action.payload.products,
            page: action.payload.page,
            pages: action.payload.pages,
            countProducts: action.payload.countProducts,
            loading: false
         };

        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }

        default:
            return state;
    }

};

const prices = [
    {
        name: '$1 to $50',
        value: '1-50'
    },
    {
        name: '$51 to $200',
        value: '51-200'
    },
    {
        name: '$201 to $1000',
        value: '201-1000'
    }
];

const ratings = [
    {
        name: '4stars & up',
        rating: 4,
    },
    {
        name: '3stars & up',
        rating: 3,
    },
    {
        name: '2stars & up',
        rating: 2,
    },
    {
        name: '1stars & up',
        rating: 1,
    }
]

export default function SearchScreen() {

    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search); // search?category=Shirts
    const category = sp.get('category') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;

    const [{loading, error, products, pages, countProducts}, dispatch] = useReducer(reducer, {
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchData = async () => {

            try {

                const { data } = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
                );
                dispatch({type: 'FETCH_SUCCESS', payload: data})
                
            } catch (error) {
                dispatch({type: 'FETCH_FAIL', payload: getError(error)})
            }
        }
        fetchData()
    }, [category, order, page, price, query, rating]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`/api/products/categories`);
                setCategories(data)
            } catch (error) {
                toast.error(getError(error))
            }
        }
        fetchCategories();
    }, [dispatch]);

    const getFilterUrl = (filter) => {
        
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;

        return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;

    };

  return (
    <div>
        <Helmet>
            <title>Search Products</title>
        </Helmet>
        <h1>Search Products</h1>
        <Row>
            <Col md={3}>
                <h3>Department</h3>
                <div>
                    <ul>
                        <li>
                            <Link
                                className={ category === 'all' ? 'fw-bold' : ''}
                                to={getFilterUrl({category: 'all'})}
                            >
                                Any
                            </Link>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat}>
                                <Link 
                                className={cat === category ? 'fw-bold' : ''}
                                to={getFilterUrl({ category : cat })}
                                >
                                    {cat}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>Price</h3>
                    <ul>
                        <li>
                            <Link
                                className={'all' === price ? 'fw-bold' : ''}
                                to={getFilterUrl({price: 'all'})}
                            >
                                Any
                            </Link>
                        </li>
                        {prices.map((pri) => (
                            <li key={pri.value}>
                                <Link 
                                    className={price === pri.value ? 'fw-bold' : ''}
                                    to={getFilterUrl({ price: pri.value })}
                                >
                                    {pri.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="align-content-center">
                    <h3>Avg. Customer Review</h3>
                    <ul>
                        {ratings.map((rat) => (
                            <li key={rat.name} className="list-unstyled mb-2">
                                <Link
                                    to={getFilterUrl({rating: rat.rating})}
                                    className={rat.rating === rating ? 'fw-bold' : ''}
                                >
                                    <Rating caption={' & up'} rating={rat.rating} />
                                </Link>
                            </li>
                        ))}
                        <li className="list-unstyled">
                            <Link
                                to={getFilterUrl({ rating: 'all'})}
                                className={rating === 'all' ? 'text-red' : ''}
                            >
                                <Rating caption={' & up'} rating={0} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </Col>
            <Col md={9}>
                {loading ? 
                    <LoadingBox/> :
                    error ?
                        <MessageBox variant='danger'>{error}</MessageBox> :
                        <>
                            <Row className="justify-content-between mb-3">
                                <Col md={6}>
                                    <div>
                                        {countProducts === 0 ? 'No' : countProducts} Results
                                        {query !== 'all' && ' : ' + query}
                                        {category !== 'all' && ' : ' + category}
                                        {price !== 'all' && ' : Price ' + price}
                                        {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                                        {query !== 'all' || category !== 'all' || rating !== 'all' || price !== 'all' ? 
                                            <Button
                                                variant='light'
                                                className='ms-1'
                                                onClick={() => navigate('/search')}
                                            >
                                                <i className='fas fa-times-circle'></i>
                                            </Button> :
                                            null
                                        }
                                        
                                    </div>
                                </Col>
                                <Col className="text-end">
                                    Sort by{' '}
                                    <select
                                        value={order}
                                        onChange={(e) => {
                                            navigate(getFilterUrl({order: e.target.value}))
                                        }}
                                    >
                                        <option value='newest'>Newest Arrivals</option>
                                        <option value='lowest'>Price: Low to High</option>
                                        <option value='highest'>Price: High to Low</option>
                                        <option value='toprated'>Avg. Customer Reviews</option>
                                    </select>
                                </Col>
                            </Row>
                            {products.length === 0 && 
                                <MessageBox>No Product Found</MessageBox>
                            }
                            <Row>
                                {products.map(product => (
                                    <Col sm={6} lg={4} className="mb-3" key={product._id}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>

                            <div>
                                {[...Array(pages).keys()].map(pag => (
                                    <LinkContainer
                                        key={pag + 1}
                                        className="mx-1"
                                        to={getFilterUrl({ page: pag + 1 })}
                                    >
                                        <Button
                                            className={Number(page) === pag + 1 ? "fw-bold" : ''}
                                            variant='light'
                                        >
                                            {pag + 1}
                                        </Button>
                                    </LinkContainer>
                                ))}
                            </div>
                        </>
                }
            </Col>
        </Row>
    </div>
  )
}
