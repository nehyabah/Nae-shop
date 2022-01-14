import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../context/cartContext";

interface Props {}

const ShippingPage = (props: Props) => {
  const cart = useSelector((state: RootState) => {
    return state.cart;
  });
  const { shippingAddress } = cart;

  const [address, setAddress] = useState<string>(shippingAddress.address);
  const [city, setCity] = useState<string>(shippingAddress.city);
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress.postalCode
  );
  const [country, setCountry] = useState<string>(shippingAddress.country);
  const push = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="py-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="py-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="py-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
