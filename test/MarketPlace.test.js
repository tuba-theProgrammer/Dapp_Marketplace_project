const { assert } = require("chai");

require('chai').use(require('chai-as-promised')).should()


const MarketPlace= artifacts.require('./MarketPlace.sol');
contract('MarketPlace',([deployer,seller,buyer])=>{
    let marketplace;
    before(async()=>{
        marketplace= await MarketPlace.deployed();
    })

    describe('deployment',async()=>{
        it('deploys successfully',async()=>{
        const address = await marketplace.address;
        assert.notEqual(address,0x0)
        assert.notEqual(address,'')
        assert.notEqual(address,null)
        assert.notEqual(address,undefined)

        })

        it('has a name',async()=>{
            const name= await marketplace.name();
            assert.equal(name,'DApp university market Place')
        })
    })


    describe('products',async()=>{
        let result,productCount;
    before(async()=>{
        result= await marketplace.createProduct('Redmi note 9s',web3.utils.toWei('1','Ether'),{from:seller});
        productCount= await marketplace.productCount();
    })
    it('creates products',async()=>{
              assert.equal(productCount,1);

              // check logs
            const event = result.logs[0].args
        assert.equal(event.id.toNumber(),productCount.toNumber(),'id is correct');
        assert.equal(event.name,'Redmi note 9s',' is correct');
        assert.equal(event.price,'1000000000000000000','price is correct');
        assert.equal(event.owner,seller,' is correct');
        assert.equal(event.purchased,false,' is correct');
      
   // check for failures: product must have a name
   await marketplace.createProduct('',web3.utils.toWei('1','Ether'),{from:seller}).should.be.rejected;
   await marketplace.createProduct('Redmi note 9s',0,{from:seller}).should.be.rejected;


    })

    it('Lists of products',async()=>{
     const product = await marketplace.products(productCount);
     assert.equal(product.id.toNumber(),productCount.toNumber(),'id is correct');
     assert.equal(product.name,'Redmi note 9s',' is correct');
     assert.equal(product.price,'1000000000000000000','price is correct');
     assert.equal(product.owner,seller,' is correct');
     assert.equal(product.purchased,false,' is correct');

})

it('sells products',async()=>{
// Track seller balance before purchase
  let oldSellerBalance
  oldSellerBalance= await web3.eth.getBalance(seller)
  // converting the balance into big number
  oldSellerBalance = new web3.utils.BN(oldSellerBalance)
    // SUCCESS: buyer make purchase
  result= await marketplace.purchaseProduct(productCount,{from:buyer,value:web3.utils.toWei('1','Ether')});
  


  
  // check logs
  const event = result.logs[0].args
  assert.equal(event.id.toNumber(),productCount.toNumber(),'id is correct');
  assert.equal(event.name,'Redmi note 9s',' is correct');
  assert.equal(event.price,'1000000000000000000','price is correct');
  assert.equal(event.owner,buyer,'owner is correct');
  assert.equal(event.purchased,true,'purchased is correct');
// make sure the seller receive the funds
// check how much seller has before and after and then see the differnce

let newSellerBalance
newSellerBalance= await web3.eth.getBalance(seller)
// converting the balance into big number
newSellerBalance = new web3.utils.BN(newSellerBalance)
   let price =await web3.utils.toWei('1','Ether')
   price = new web3.utils.BN(price)
   
   //console.log(oldSellerBalance,newSellerBalance,price)
   
   const expectedBalance = oldSellerBalance.add(price)
   console.log("price here",price)
   console.log("expected balance ",expectedBalance)
   assert.equal(newSellerBalance.toString(),expectedBalance.toString())
  

   // Failures: Tries to buy a product that does not exist i.e product must
   // have a valid id

   await marketplace.purchaseProduct(99,{from:buyer,value:web3.utils.toWei('1','Ether')}).should.be.rejected;
  // Failure: Buyer tries to buy with not enough ether

  await marketplace.purchaseProduct(productCount,{from:buyer,value:web3.utils.toWei('0.5','Ether')}).should.be.rejected;
// failure: deployer tries to buy the product  i.e  someone tries to buy the product twice
await marketplace.purchaseProduct(productCount,{from:deployer,value:web3.utils.toWei('1','Ether')}).should.be.rejected;

// failure: buyer tries to buy again i.e buyer cant be the seller
await marketplace.purchaseProduct(productCount,{from:seller,value:web3.utils.toWei('1','Ether')}).should.be.rejected;

})

    })




})