import React, {useEffect, useState } from 'react';
import getWeb3 from '../Utils/getWeb3';
import MarketPlace from '../abis/MarketPlace.json'
import NavbarComponent from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';

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
        await setMarketPlace(marketplace)
        await setLoading(false)

        }else{
            alert('Marketplace Contract not deployed to detected network')

        }



           
    }

     return(<>
   
      <NavbarComponent account={getAccount}/>
      <div className='container-fluid-mt-5'>
        <div className='row'>
            {getLoading?<div id='loader' className='text-center'><p className='text-center'>Loading...</p></div>:   <Main/>}
      
        </div>

      </div>
     </>)
}
export default MarketPlaceComponent;