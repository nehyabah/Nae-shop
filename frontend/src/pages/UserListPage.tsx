import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { listUsers } from "../context/userContext";
import { RootState } from "../reduxStore";

interface Props {
  user?: string;
}

const UserListPage: React.FC<Props> = () => {
    const dispatch = useDispatch();
      const push = useNavigate();
  const userList = useSelector((state: RootState) => {
    return state.userList;
  });
    const { loading, error, users } = userList;
    

  const userLogin = useSelector((state: RootState) => {
    return state.userLogin;
  });
  const { userInfo} = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
          dispatch(listUsers())
        } else {
           push('/login')
      }

    dispatch(listUsers());
  }, [dispatch, push, userInfo]);
    
    const deleteHandler = (id: string) => {
        console.log('delete');
        
    }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;