import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { getOrderDetails } from "../context/orderContext";

interface cartItemProps {
  name?: string;
  image?: string;
  price?: number;
  qty?: number;

  productId?: string;
}
interface orderItemProps {
  name?: string;
  image?: string;
  price?: number;
    qty?: number;
    address?: string;

  productId?: string;
}

const OrderPage: React.FC<cartItemProps> = ({ price, qty}) => {
  const dispatch = useDispatch();
  const push = useNavigate();

  const { id } = useParams<{ id?: string | undefined }>();
  const orderDetails = useSelector((state: RootState) => {
    return state.orderDetails;
  });
    const { order, loading, error } = orderDetails;
    
  useEffect(() => {
    dispatch(getOrderDetails(orderID));
  }, []);

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address} {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {order.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>order items</h2>
              {order.orderItems.length === 0 ? (
                <h4>Your order is empty</h4>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map(
                    (item: orderItemProps | any, idx: number) => (
                      <ListGroup.Item key={idx}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>${item.qty * item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>£{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>£{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
