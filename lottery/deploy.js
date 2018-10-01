const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
console.log("Hello");

const provider = new HDWalletProvider(
  'wonder success myth island fragile tourist cloth execute minute snow appear labor',
  'https://rinkeby.infura.io/v3/5b15424d341c46c28f4bde0442b714d8'
);

console.log(provider);
const web3 = new Web3(provider);
console.log(web3);
web3.eth.getAccounts(function(err, res){ console.log(res); });
const deploy =  () => {
  const accounts =  web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);
  const result =  new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address);
};
deploy();

/* wonder success myth island fragile tourist cloth execute minute snow appear labor */