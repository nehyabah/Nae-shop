import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";

export type ProductType = {
  _id?: number;
  image?: string;
  product: any;
  name?: string;
  rating?: number;
  numReviews?: number;
  price?: number;
};

const Product: React.FC<ProductType> = (product) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>

      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              rating={product.rating}
              numReviews={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">£{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
