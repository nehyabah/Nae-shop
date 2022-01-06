import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { listProducts } from "../context/productContext";
import { productListReducer } from "../Reducers/productReducers";
import { RootState } from "../reduxStore";
import { ProductType } from "../components/Product";

interface HomePagePropTypes {
  _id?: number;
  // product?: product[];
}

const HomePage: React.FC<HomePagePropTypes> = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state: RootState) => {
    return state.productList;
  });
  const {
    loading,
    error,
    products,
  }: { loading: boolean; error: boolean; products: ProductType[] } =
    productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loading/>
      ) : error ? (
        <Message variant ='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product {...product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomePage;
