import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { RootState } from "../reduxStore";
import {
  listProductDetails,
  createProductReview,
} from "../context/productContext";
import { ActionType } from "../action-types/actionTypes";

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
  countInStock?: any;
  image?: string;
  brand?: string;
  numReviews?: number;
}

// interface reviewProps {
//   _id?: string;
//   name?: string;
//   rating?: any;
//   createdAt?: any;
//   comment?: string;
// }

const ProductPage: React.FC<productPageProps> = ({
  brand,
  name,
  image,

  price,
  description,
  numReviews,
  countInStock,
}) => {
  const { id } = useParams<{ id?: string }>();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const push = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state: RootState) => {
    return state.productDetails;
  });
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state: RootState) => {
    return state.userLogin;
  });
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state: RootState) => {
    return state.productReviewCreate;
  });
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;
  // const product = listProductDetails;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted Successfully!");
      setRating(0);
      setComment("");
      dispatch({ type: ActionType.PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    push(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image
                src={product && product?.image}
                alt={product?.name}
                fluid
              />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product?.rating}
                    numReviews={`${product?.numReviews} Reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: £{product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>{product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e: any) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={() => addToCartHandler()}
                      className="btn-block"
                      type="button"
                      disabled={product?.countInStock === 0}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <h5 style={{ color: "cornflowerblue" }}>No Reviews</h5>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review: any) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} color={"#FFDE2B"} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Leave a review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e: any) => setRating(e.target.value)}
                        >
                          <option value="">Select ...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          // rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        >
                          {" "}
                        </Form.Control>
                      </Form.Group>

                      <Button type="submit" variant="primary" className="mt-3">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <h5>
                      Please <Link to="/login">sign in</Link> to write a review
                    </h5>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
