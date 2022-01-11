import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { addToCart } from "../context/cartContext";
import { RootState } from "../reduxStore";

interface cartPageProps {
  // productId?: String;
}

const CartPage: React.FC<cartPageProps> = ({}) => {
  return <div>Cart</div>;
};

export default CartPage;
