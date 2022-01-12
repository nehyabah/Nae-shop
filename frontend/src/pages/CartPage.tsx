import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../context/cartContext";

import { RootState } from "../reduxStore";

import { useNavigate } from "react-router";

interface cartItems {
  productId?: String;
  quantity?: number;
  name?: String;
  image?: String;
  price?: number;
  //countInStock?: number;
}

const CartPage: React.FC<cartItems> = (props: cartItems) => {
  const { id } = useParams<{ id: string }>();
  const { search } = useLocation();
  const quantity = search ? Number(search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const push = useNavigate();

  const cart = useSelector((state: RootState) => {
    console.log("state", state);

    return state.cart;
  });
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [dispatch, id, quantity]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h3>
            Your cart is empty <Link to="/">Go back</Link>
          </h3>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item: any, idx: number) => {
              return (
                <React.Fragment key={idx}>
                  <ListGroup.Item key={item.productId}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(
                            e: React.ChangeEvent<
                              HTMLInputElement | HTMLTextAreaElement
                            >
                          ) =>
                            dispatch(
                              addToCart(item.productId, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="black"
                          onClick={() => removeFromCartHandler(item.productId)}
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </React.Fragment>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc: any, item: any) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc: any, item: any) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                {" "}
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
