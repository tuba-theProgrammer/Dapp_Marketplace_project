const { assert } = require("chai");

const MarketPlace= artifacts.require('./MarketPlace.sol');
contract('MarketPlace',(account)=>{
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
        result= await marketplace.createProduct('Redmi note 9s',web3.utils.toWei('1','Ether'));
        productCount= await marketplace.productCount();
    })
    it('creates products',async()=>{
              assert.equal(productCount,1);
    })



    })




})