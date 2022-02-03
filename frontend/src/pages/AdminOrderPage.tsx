import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { listOrders } from "../context/orderContext";
import { RootState } from "../reduxStore";

interface Props {
  user?: string;
}

const AdminOrderPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const push = useNavigate();
  const orderList = useSelector((state: RootState) => {
    return state.orderList;
  });
  const { loading, error, orders } = orderList;

  console.log("users", orders);

  const userLogin = useSelector((state: RootState) => {
    return state.userLogin;
  });
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo?.isAdmin) {
      dispatch(listOrders());
    } else {
      push("/login");
    }
dispatch(listOrders());
   
  }, [dispatch, push, userInfo]);
console.log('orders', orders);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {
              orders.map((order: any) => {
                console.log(order);
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>£{order.totalPrice}</td>
                  
                    <td>
                      {order && order.isPaid ? (
                       order.paidAt.substring(0,10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                  
                    <td>
                      {order && order.isDelivered ? (
                       order.deliveredAt.substring(0,10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light" className="btn-sm">
                         Details
                        </Button>
                      </LinkContainer>
                
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminOrderPage;
