const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface,bytecode} = require('../compile');
const provider = ganache.provider();
const web3 = new Web3(provider);

// class Car {
//     park() {
//         return "parking";
//     }
//     drive(){
//         return "driving";
//     }
// }
// let car;

// beforeEach(()=>{
//     car=new Car();
// });

// describe('Car',()=>{
//     it('can park',()=> {
        
//         assert.equal(car.park(),'parking');
//     });
//     it('can drive',()=>{
        
//         assert.equal(car.drive(),'driving');
//     });
// });/* The car written here can be anything other than car also  */
let accounts;
let inbox;

beforeEach(async ()=>{
    /* Get a list of accounts to deploy our contract */
    accounts = await web3.eth.getAccounts();
    /* Use any of the accounts displayed in the console  to deploy the contract  */
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data : bytecode, arguments: ['Hi there '] })
    .send({ from : accounts[0], gas : '1000000' });
    inbox.setProvider(provider);
});

describe('Inbox',()=>{
    it('deploy contract',()=>{
        assert.ok(inbox.options.address);
    });
    it('has a default message',async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi there ');
    });
    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
      });
});