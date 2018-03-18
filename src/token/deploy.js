const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const BLOXAB = require('./build/BLOXAB.json');

const provider = new HDWalletProvider(
  'clown shiver beach wheel this mixture emotion illness fatigue amateur talent bitter',
  'https://rinkeby.infura.io/TnLV7HlGk5SeiboICQWq'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  // console.log(BLOXAB.bytecode)
  // console.log(BLOXAB.interface)
  const result = await new web3.eth.Contract(
    JSON.parse(BLOXAB.interface)
  )
    .deploy({ data: BLOXAB.bytecode }) //Creating 1,000 ST
    .send({ gas: '4712388', from: accounts[0] });
    console.log('Contract deployed to: ', result.options.address);
};
deploy();
