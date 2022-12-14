import React, {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';import Badge from 'react-bootstrap/Badge';
import Web3 from "web3";
import Table from 'react-bootstrap/Table';

function Main(props){

    const [getProductName,setProductName]= useState('')
    const [getProductPrice,setProductPrice] = useState('')
  
    useEffect(()=>{

    },[])
    const handleProductPriceChange=(e)=>{
        setProductPrice(e.target.value)
    }

    const handleProductNameChange=(e)=>{

   setProductName(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const web3 = new Web3();
     
        const price = web3.utils.toWei(getProductPrice.toString(),'Ether')
      props.createProductCall(getProductName,price)
    }


   
 return(<>
   <main role="main" className='col=lg-12 d-flex'>
         <div id="content">
         <h1>
      <Badge bg="secondary">ADD PRODUCTS</Badge>
      </h1>
      <Form className='mt-3'>
      <Form.Group className="mb-3" controlId="ProductNameControl">
        <Form.Label>Product Name</Form.Label>
        <Form.Control onChange={handleProductNameChange} type="text" placeholder="Enter Product Name"  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="ProductTypeControl">
        <Form.Label>Product Price</Form.Label>
        <Form.Control type="text" onChange={handleProductPriceChange} placeholder="Enter Product Price" />
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Add Product
      </Button>
    </Form>
    <div>
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Owner</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
     { 
        props.productList.map(product=>(
          
         <tr>
          <td>{product.id.toString()}</td>
          <td>{product.name}</td>
          <td>{product.price.toString()} Eth </td>
          <td>{product.owner}</td>
          <td>
            {!product.purchased?
   <Button variant="primary" onClick={()=>{props.purchaseProductCall(product.id,product.price)}}>
   Buy
</Button>:<h5>purchased</h5>
            }
       
          </td>
      
        </tr>
        
        ))
     }

       
      </tbody>
    </Table>
    </div>
         </div>
         
           </main>
 </>)
}
export default Main;