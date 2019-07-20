// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
const truffleAssert = require('truffle-assertions');
const SupplyChain = artifacts.require('SupplyChain');

let supplyChain; // the actual instance of the contract
// Declare few constants and assign a few sample accounts generated by ganache-cli
let ownerID;
let originFarmerID;
let distributorID;
let retailerID;
let consumerID;
const sku = 1;
const upc = 1;
const originFarmName = "John Doe";
const originFarmInformation = "Yarray Valley";
const originFarmLatitude = "-38.239770";
const originFarmLongitude = "144.341490";
let productID = sku + upc;
const productNotes = "Best beans for Espresso";
const productPrice = web3.utils.toWei('1', "ether");
let itemState = 0;

const emptyAddress = '0x00000000000000000000000000000000000000';




contract('SupplyChain', (accounts) => {
    owner = accounts[0];
    ownerID = accounts[0];
    originFarmerID = accounts[1];
    distributorID = accounts[2];
    retailerID = accounts[3];
    consumerID = accounts[4];
    console.log("ganache-cli accounts used here...");
    console.log("Contract Owner: accounts[0] ", accounts[0]);
    console.log("Farmer: accounts[1] ", accounts[1]);
    console.log("Distributor: accounts[2] ", accounts[2]);
    console.log("Retailer: accounts[3] ", accounts[3]);
    console.log("Consumer: accounts[4] ", accounts[4]);
});

beforeEach(async () => {
    supplyChain = await SupplyChain.deployed();
});

describe('Testing functionality for the SupplyChain contract', () => {
    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async () => {
        // Mark an item as Harvested by calling function harvestItem()
        let hv = await supplyChain.harvestItem(
            upc,
            originFarmerID,
            originFarmName,
            originFarmInformation,
            originFarmLatitude,
            originFarmLongitude,
            productNotes)
        truffleAssert.eventEmitted(hv, 'Harvested');
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        console.log(resultBufferOne);
        // Verify the result set
        assert.equal(resultBufferOne[0].words[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1].words[0], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State')
    });

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async () => {
        // Mark an item as Processed by calling function processItem()
        let pr = await supplyChain.processItem(upc);
        truffleAssert.eventEmitted(pr, 'Processed');

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0].words[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1].words[0], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 1, 'Error: Invalid item State')
    });

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async () => {

        // Declare and Initialize a variable for event


        // Watch the emitted event Packed()


        // Mark an item as Packed by calling function packItem()
        const pk = await supplyChain.packItem(upc);
        truffleAssert.eventEmitted(pk, 'Packed');

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0].words[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1].words[0], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 2, 'Error: Invalid item State')
    });

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {
        // Mark an item as ForSale by calling function sellItem()
        const si = await supplyChain.sellItem(1, 5);
        truffleAssert.eventEmitted(si, 'ForSale');

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0].words[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1].words[0], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[5], 3, 'Error: Invalid item State')
    });

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {

        // Declare and Initialize a variable for event


        // Watch the emitted event Sold()
        var event = supplyChain.Sold()


        // Mark an item as Sold by calling function buyItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {

        // Declare and Initialize a variable for event


        // Watch the emitted event Shipped()


        // Mark an item as Sold by calling function buyItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {

        // Declare and Initialize a variable for event


        // Watch the emitted event Received()


        // Mark an item as Sold by calling function buyItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {

        // Declare and Initialize a variable for event


        // Watch the emitted event Purchased()


        // Mark an item as Sold by calling function buyItem()


        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set

    })

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {

        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set:

    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {

        // Retrieve the just now saved item from blockchain by calling function fetchItem()


        // Verify the result set:

    })

});
