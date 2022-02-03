import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../context/userContext";
import { RootState } from "../reduxStore";
import { useNavigate, useParams } from "react-router";
import { ActionType } from "../action-types/actionTypes";

interface Props {
  location?: any;
  search?: any;
}

const UserEditPage: React.FC<Props> = ({ location }) => {
  //Use Params
  const { id } = useParams<{ id?: string | undefined }>();
  console.log(id);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAdmin, setisAdmin] = useState<boolean>(false);

  const dispatch = useDispatch();
  const push = useNavigate();

  const userDetails = useSelector((state: RootState) => {
    return state.userDetails;
  });
  const { loading, error, user } = userDetails;
  console.log('error', error);
  
  // console.log("user", user);

  const userUpdate = useSelector((state: RootState) => {
    return state.userUpdate;
  });
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ActionType.USER_UPDATEAD_RESET });
      push("/admin/userlist");
    } else {
      if (!user?.name || user?._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setisAdmin(user.isAdmin);
      }
    }
  }, [push, dispatch, id, successUpdate]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userDetails, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
