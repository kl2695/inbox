const HDWalletProvider = require('truffle-hdwallet-provider'); 
const Web3 = require('web3') 
const { interface, bytecode } = require('./compile'); 

const provider = new HDWalletProvider(
    'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat', 
    'https://rinkeby.infura.io/1jSHr7QaeTYsHnWP76TE'
); 

const web3 = new Web3(provider);


let inbox; 
const deploy = async () => {
    const accounts = await web3.eth.getAccounts(); 

    console.log(accounts);
    console.log('Attempting to deploy from account', accounts[0]); 

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to', inbox.options.address);


};
deploy(); 