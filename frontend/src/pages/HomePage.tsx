import React from 'react'
import products from '../products'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'


interface HomePagePropTypes{
    _id?: number;
}

const HomePage : React.FC <HomePagePropTypes> = () => {
    return (
        <>
            <h1>Latest products</h1>
            <Row>{products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}</Row>
        </>
    )
}

export default HomePage
