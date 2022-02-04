import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../context/productContext";
import { RootState } from "../reduxStore";
import { ActionType } from "../action-types/actionTypes";

interface Props {
  user?: string;
}

const ProductListPage: React.FC<Props> = () => {
  const { id } = useParams<{ id?: any }>();
  const dispatch = useDispatch();
  const push = useNavigate();
  const productList = useSelector((state: RootState) => {
    return state.productList;
  });
  const { loading, error, products } = productList;

  const productDelete = useSelector((state: RootState) => {
    return state.productDelete;
  });
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successsDelete,
  } = productDelete;

  const productCreate = useSelector((state: RootState) => {
    return state.productCreate;
  });
  const {
    loading: loadingCreate,
    error: errorCreate,
      success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state: RootState) => {
    return state.userLogin;
  });
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ActionType.PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      push("/login");
    }
    if (successCreate) {
      push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, push, userInfo, successsDelete, successCreate, createdProduct]);

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
   dispatch(createProduct())
  };

  return (
    <>
      <Row className="d-flex ">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loading />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loading />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>£ {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
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

export default ProductListPage;
