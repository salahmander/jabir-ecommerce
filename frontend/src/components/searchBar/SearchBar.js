import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
       <Button type='submit' variant='outline-primary' className='p-3'>
        <i className="fas fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBar;
