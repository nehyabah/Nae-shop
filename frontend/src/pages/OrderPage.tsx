import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import { useNavigate } from "react-router";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../context/orderContext";
import { ActionType } from "../action-types/actionTypes";

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

// declare global {
//   interface Window {
//     paypal?: any ;
//   }
// }

const OrderPage: React.FC<cartItemProps> = ({ price, qty }) => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams<{ id?: string }>();
  const [sdkReady, setSdkReady] = useState<boolean>(false);

  const orderDetails = useSelector((state: RootState) => {
    return state.orderDetails;
  });
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state: RootState) => {
    return state.userLogin;
  });
  const { userInfo } = userLogin;

  const orderPay = useSelector((state: RootState) => {
    return state.orderPay;
  });
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state: RootState) => {
    return state.orderDeliver;
  });
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const push = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ActionType.ORDER_PAY_RESET });
      dispatch({ type: ActionType.ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, push, userInfo]);

  if (!loading) {
    // calculate prices
    const addDecimal = (num: number) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimal(
      order?.orderItems.reduce(
        (acc: any, item: any) => acc + item.price * item.qty,
        0
      )
    );
  }

  const successPaymentHandler = (paymentResult: any) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

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
              <strong>Name: </strong> {order.user.name}
              <br />
              <a href={`mailto:${order.user.email}`}>
                Email: {order.user.email}
              </a>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address} {order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <h5 style={{ color: "green" }}>
                  Delivered on {order.deliveredAt}
                </h5>
              ) : (
                <h5 style={{ color: "red" }}>Not Delivered</h5>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <h5 style={{ color: "green" }}>Paid on {order.paidAt}</h5>
              ) : (
                <h5 style={{ color: "red" }}>Not Paid</h5>
              )}
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
                            <Link to={`/product/${item.productId}`}>
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
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loading />}
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loading />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Out for Delivery
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
