import Web3 from 'web3';
import Constants from '../constants';

const contract = require('./JagerGitClient.json');
const dai = require('./Dai.json');

let web3;

async function init() {
  web3 = new Web3(
    window.ethereum
  );
}

init();
export default () => web3;
export const Contract = () => new web3.eth.Contract(contract.abi, Constants.ContractAddress);
export const DaiContract = () => new web3.eth.Contract(dai.abi, Constants.DaiAddress);
