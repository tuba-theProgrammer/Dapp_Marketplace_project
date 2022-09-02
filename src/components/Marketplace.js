import React, {useEffect, useState } from 'react';
import getWeb3 from '../Utils/getWeb3';
import MarketPlace from '../abis/MarketPlace.json'
import NavbarComponent from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';
import Button from 'react-bootstrap/Button';

function MarketPlaceComponent(props){
   
    const [getAccount,setAccount] = useState('hello');
    const [getProductCount,setProductCount] = useState(0);
    const [getProducts,setProducts]= useState([])
    const [getMarketPlace,setMarketPlace] = useState('')
    const [getLoading,setLoading]= useState(true)

    useEffect(()=>{

           loadBlockChainData();
         
    },[])
   
 

  

    async function loadBlockChainData(){
        const web3 = await getWeb3(); 
        //PASS AS PROP
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        console.log("here is accounts ",accounts)

        // new logic pata chali - wah
         await setAccount(accounts[0])
      
        // to get the network id dynamically
        const networkId= await web3.eth.net.getId();
        console.log(networkId)
        const networkData = MarketPlace.networks[networkId]
        if(networkData){
             // this is how we load actual smart contract into the blockchain
        const marketplace = web3.eth.Contract(MarketPlace.abi,networkData.address)

        console.log(marketplace)
        
        const productCount= await marketplace.methods.productCount().call()
        console.log("here is product count ",productCount.toString())

        // fetch each product individually from the blockchain
        for(var i =1;i<=productCount;i++){
            const product= await marketplace.methods.products(i).call()
            console.log("here is product ",product)
            setProducts(getProducts=>[...getProducts,product])
          
        }

        await setProductCount(productCount.toString())
        await setMarketPlace(marketplace)
        await setLoading(false)

        }else{
            alert('Marketplace Contract not deployed to detected network')

        }



           
    }

   
 
    function CreateProduct(name,price){
        setLoading(true)
        getMarketPlace.methods.createProduct(name,price).send({from:getAccount})
        .once('receipt',(receipt)=>{
            setLoading(false)

        })
    }


    function purchaseProduct(id,price){
        setLoading(true)
        getMarketPlace.methods.purchaseProduct(id).send({from:getAccount,value: price})
        .once('receipt',(receipt)=>{
            setLoading(false)

        })
    }

     return(<>
   
      <NavbarComponent account={getAccount}/>
      <div className="border d-flex align-items-center justify-content-center mt-5">
        <div className='row'>
            {getLoading?<div id='loader' className='text-center'><p className='text-center'>Loading...</p></div>:   <Main createProductCall={CreateProduct} productList={getProducts} purchaseProductCall={purchaseProduct}/>}
      
        </div>
         
    
      </div>
     </>)
}
export default MarketPlaceComponent;