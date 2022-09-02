import React, {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';import Badge from 'react-bootstrap/Badge';


function Main(props){
 return(<>
   <main role="main" className='col=lg-12 d-flex'>
         <div id="content">
         <h1>
      <Badge bg="secondary">ADD PRODUCTS</Badge>
      </h1>
      <Form>
      <Form.Group className="mb-3" controlId="ProductNameControl">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="ProductTypeControl">
        <Form.Label>Product Price</Form.Label>
        <Form.Control type="text" placeholder="Enter Product Price" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
         </div>
         
           </main>
 </>)
}
export default Main;