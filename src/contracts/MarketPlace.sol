
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract MarketPlace{
    string public name;
    // to check how many product are there in map
    uint public productCount = 0;

    // uint is the key - that will be product id , 
    // product is value stored in key
    // products is the name of the map
    mapping(uint=>Product) public products ;
     struct Product{
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
     } 

    constructor(){
    name="DApp university market Place";
    }
    

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );


     event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );


    function createProduct(string memory _name,uint _price) public {
 
 // make sure parameters are correct 
     require(bytes(_name).length>0,'name must be provided');
     require(_price>0,'price must be provided');


    // Increment product count
       productCount++;
       // create product
       products[productCount]= Product(productCount,_name,_price,payable(msg.sender),false);
         // we can check the log by triggering events
          // trigger event - tell blockchain that something has happend
    
       emit ProductCreated(productCount,_name,_price,payable(msg.sender),false);
    }


    // allow user to purchase products
     function purchaseProduct(uint _id)public payable{

        // Fetch the Product
         Product memory  _product= products[_id];
 
        // Fetch the owner

        address payable _seller = _product.owner;
       
  // make sure the product has valid id
    require(_product.id>0&&_product.id<=productCount,'invalid id');
    // Require that there is enough ether in the transanction
    require(msg.value>=_product.price);

    // require that product has not purchased yet
    require(!_product.purchased);

    //Require that buyer is not the seller

    require(_seller!=msg.sender);

 


        // trnsfer ownership to the buyer
    _product.owner= payable(msg.sender);
        // purchase it

        _product.purchased=true;
        // update their products in mapping
        
        products[_id] = _product;
       
        // Pay the seller - by sending them ether
        payable(address(_seller)).transfer(msg.value);

        // Trigger an event

       emit ProductPurchased(productCount,_product.name,_product.price,payable(msg.sender),true);
     }

}