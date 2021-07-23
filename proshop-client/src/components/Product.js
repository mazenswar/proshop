import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'


function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/products/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/products/${product._id}`}>
                    <Card.Title src={product.image} variant='top'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </Card.Text>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}
                />
            </Card.Body>
        </Card>
    )
}

export default Product
