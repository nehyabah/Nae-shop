import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
// import products from '../products';
import {useParams} from 'react-router'
import axios from 'axios'

interface productPageProps {
    match?: any;
    product?: string;
    params?: any;
    _id?: string;
    p?: string;
    name?: string;
    rating?: number;
    price?: number;
    description?: string;
    countInStock?:any;
    image?: string;
    brand?: string;
    numReviews?: number;
    
}





const ProductPage: React.FC<productPageProps> = ({brand, name,image, rating, price, description, numReviews, countInStock}) => {
    const { id } = useParams < {id:string}>();
    // const product = products.find(p => p._id === id)
    //   const { id } = useParams<{ id?: string | undefined }>();


    const [product, setProduct] = useState<productPageProps | undefined>({})
    
    useEffect(() => {
        const fetchProduct = async () => {
            const {data}: any = await axios.get(`/api/products/${id}`)

            setProduct(data)
            
        }


        fetchProduct()
    },[brand, name,image, rating, price, description, numReviews, countInStock])
    

    return (
        <>
             

        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>
        <Row>
                <Col md={6}>
                    <Image src={product?.image} alt={product?.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product?.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product?.rating} numReviews={`${product?.numReviews} Reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: £{product?.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: £{product?.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                     <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                               
                                <Col>
                                    Price
                                </Col>
                                <Col>
                                    <strong>{ product?.countInStock}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    <strong>{product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled ={product?.countInStock===0}>Add to cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                        </Card>
                </Col>
        </Row>
        </>
    )
}

export default ProductPage;
