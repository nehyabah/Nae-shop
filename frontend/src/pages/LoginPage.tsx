import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { login } from "../context/userContext";
import {RootState} from '../reduxStore'

interface Props {
  location?: any;
  search?: any;
}

const LoginPage: React.FC<Props> = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const { search } = useLocation();
    const push = useNavigate()
    
    const dispatch = useDispatch()

    const userLogin = useSelector((state: RootState) => {
        return state.userLogin
    })
        
    const {loading, error, userInfo} = userLogin

    const redirect = search ? search.split("=")[1] : "/";
    
    useEffect(() => {
        if (userInfo) {
            push(redirect)
        }
    },[push, userInfo, redirect])

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // DISPATCH LOGIN
      dispatch(login(email, password))
  };

  return (
    <FormContainer>
          <h1>Sign In</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loading/>}
      <Form onSubmit={submitHandler}>
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

        <Button type="submit" variant="primary">
          {" "}
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
