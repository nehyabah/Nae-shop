import React from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';
import {useParams} from 'react-router'


interface productPageProps{
    match?: any;
    product?: string;
    params?: any;
    _id?: string;
    p?: any;
}





const ProductPage: React.FC<productPageProps> = ({ match }) => {
    // const { id } = useParams();
const product = products.find(p => p._id === match.params.id)

    return (
        <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        <Row>
                <Col md={6}>
                    <Image src={product?.image} alt={product?.name}/>
                </Col>

                <Col md={3}></Col>
            </Row>
            </>
    )
}

export default ProductPage;
