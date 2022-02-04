import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";




const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const push = useNavigate();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (keyword.trim()) {
      push(`/search/${keyword}`);
    } else {
      push("/");
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products"
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        <Button type="submit" variant="light">
          Search
        </Button>
      </Form>
    </>
  );
};
export default SearchBox;
