pragma solidity ^0.5.0;

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
        address owner;
        bool purchased;
     } 

    constructor() public {
    name="DApp university market Place";
    }
    

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );


    function createProduct(string memory _name,uint _price) public {
 
 // make sure parameters are correct 
     require(bytes(_name).length>0,'name must be provided');
     require(_price>0,'price must be provided');


    // Increment product count
       productCount++;
       // create product
       products[productCount]= Product(productCount,_name,_price,msg.sender,false);
         // we can check the log by triggering events
          // trigger event - tell blockchain that something has happend
    
       emit ProductCreated(productCount,_name,_price,msg.sender,false);
    }


    // allow user to purchase products
     function purchaseProduct(uint _id)public {
        // Fetch the Product
         Product memory  _product= products[_id];
 
        // Fetch the owner

        address _seller = _product.owner;
        // make sure the product is valid
        
        // trnsfer ownership to the buyer
    _product.owner= msg.sender;
        // purchase it

        _product.purchase=true;
        // update their products in mapping
        
        products[_id] = _product;
       
        // Pay the seller - by sending them ether
        

        // Trigger an event


     }

}