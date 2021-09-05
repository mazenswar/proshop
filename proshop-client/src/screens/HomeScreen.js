import React, { useEffect } from 'react';
// import products from '../products';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';



function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {products, error, loading} = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [])
    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :  <Row>
                {products.map(p => (
                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={p} />
                    </Col>)
                )}
            </Row>}
        </>
    )
}

export default HomeScreen
