import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { LinkContainer } from "react-router-bootstrap";

import {
  getUserDetails,
  updateUserProfileDetails,
} from "../context/userContext";
import { RootState } from "../reduxStore";
import { myOrders } from "../context/orderContext";

interface Props {
  location?: any;
  search?: any;
}

const ProfilePage: React.FC<Props> = ({ location }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<boolean | string | null>(null);

 
  const push = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state: RootState) => {
    return state.userDetails;
  });
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state: RootState) => {
    return state.userLogin;
  });
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state: RootState) => {
    return state.userUpdateProfile;
  });
  const { success } = userUpdateProfile;

  const myOrdersList = useSelector((state: RootState) => {
    return state.myOrders;
  });
  const {
    error: errorOrders,
    loading: loadingOrders,
    orders,
  }: { loading: boolean; error: boolean; orders: any } = myOrdersList;
  console.log(orders);

  useEffect(() => {
    if (!userInfo) {
      push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(myOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, push, userInfo, user]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // DISPATCH REGISTER
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // DISPATCH UPDATE
      dispatch(
        updateUserProfileDetails({ id: user._id, name, email, password })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <h4>{message}</h4>}
        {error && <h4 style={{ color: "red" }}>{error}</h4>}
        {success && <h4 style={{ color: "lightgreen" }}>Profile Updated</h4>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="py-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="py-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loading />
        ) : errorOrders ? (
          <h5 style={{ color: "red" }}>{errorOrders}</h5>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orders: any) => (
                <tr key={orders._id}>
                  <td>{orders._id}</td>
                  <td>{orders.createdAt.substring(0, 10)}</td>
                  <td>{orders.totalPrice}</td>
                  <td>
                    {orders.isPaid ? (
                      orders.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {orders.isDelivered ? (
                      orders.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${orders._id}`}>
                      <Button className='btn-sm' variant='light'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
