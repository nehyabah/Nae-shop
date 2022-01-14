import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../context/cartContext";

interface Props {}

const PaymentPage = (props: Props) => {
  const cart = useSelector((state: RootState) => {
    return state.cart;
  });
  const { shippingAddress } = cart;
  const push = useNavigate();
  if (!shippingAddress) {
    push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState<string>("Paypal");

  const dispatch = useDispatch();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check className='mb-4'
              type="radio"
              label="Paypal or credit Card"
              id="payPal"
              name="paymentMethod"
              value="payPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
