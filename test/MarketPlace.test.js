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

    })




})