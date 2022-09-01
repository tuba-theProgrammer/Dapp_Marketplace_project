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
    

    function createProduct(string memory _name,uint _price) public {
 // create product
 // trigger event - tell blockchain that something has happend
 // make sure parameters are correct 
    // Increment product count
       productCount++;
       products[productCount]= Product(productCount,_name,_price,msg.sender,false);

    }


    

}