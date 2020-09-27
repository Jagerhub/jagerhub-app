/* eslint-disable new-cap */
const ethers = require('ethers');
const Constants = require('../constants');
const contract = require('./JagerGitClient.json');
const dai = require('./Dai.json');
const Secrets = require('../../../secrets');

const { privateKey } = Secrets;

const network = 'kovan';
const provider = new ethers.getDefaultProvider(network);
const wallet = new ethers.Wallet(privateKey, provider);

const Contract = () => new ethers
  .Contract(Constants.ContractAddress, contract.abi, provider)
  .connect(wallet);
const DaiContract = () => new ethers.Contract(Constants.DaiAddress, dai.abi, provider);

module.exports = {
  ethers,
  Contract,
  DaiContract
};
