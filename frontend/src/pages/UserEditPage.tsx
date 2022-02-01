import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../context/userContext";
import { RootState } from "../reduxStore";
import { useParams } from "react-router";

interface Props {
  location?: any;
  search?: any;
}

const UserEditPage: React.FC<Props> = ({ location }) => {
  //Use Params
  const { id } = useParams<{ id?: string | undefined }>();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAdmin, setisAdmin] = useState<boolean>(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state: RootState) => {
    return state.userDetails;
  });

  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUserDetails(user));
    } else {
      setName(user.name);
      setEmail(user.email);
      setisAdmin(user.isAdmin);
    }
  }, [dispatch, id]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3"></Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loading />
        ) : error ? (
          <h5 style={{ color: "red" }}> {error}</h5>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
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
            <Form.Group className="py-3" controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setisAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
