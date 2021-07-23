import React from 'react'
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import products from '../products';


function ProductScreen({ match }) {
    const product = products.find(p => p._id === match.params.id);
    console.log(product);
    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            <Row >
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </>
    )
}

export default ProductScreen
