
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../context/productContext";
import { RootState } from "../reduxStore";
import { useNavigate, useParams } from "react-router";
import { ActionType } from "../action-types/actionTypes";
// import { productListReducer } from "../Reducers/productReducers";

interface Props {
  location?: any;
  search?: any;
}

const ProductEditPage: React.FC<Props> = ({ location }) => {
  //Use Params
  const { id } = useParams<{ id?: any }>();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [countInStock, setCountInStock] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  // const [uploading, setUploading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const push = useNavigate();

  const productDetails = useSelector((state: RootState) => {
    return state.productDetails;
  });
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state: RootState) => {
    return state.productUpdate;
  });
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("All Products") as string);
    dispatch({ type: ActionType.SINGLE_PRODUCT_SUCCESS, payload: product });
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ActionType.PRODUCT_UPDATE_RESET });
      push("/admin/productlist");
    } else {
      if (product) {
        if (!product.name || product._id !== id) {
          dispatch(listProductDetails(id));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setCategory(product.category);
          setBrand(product.brand);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }
  }, [dispatch, push, id, product, successUpdate]);

  // const uploadFileHandler = async (e: any) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };
  //     const { data } = await axios.post("api/upload", formData, config);
  //     setImage(data);
  //     setUploading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // UPDATE PRODUCT
    console.log("here", product);

    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        brand,
        image,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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
            <Form.Group controlId="price">
              <Form.Label>Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.value)
                }
              ></Form.Control>
              {/* <Form.File 
                id="image-file"
                label="Choose file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loading />} */}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBrand(e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e: any) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description url"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              ></Form.Control>
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

export default ProductEditPage;
