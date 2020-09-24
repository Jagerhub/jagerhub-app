import store from '../store';

const getBounties = state => state.bountyContracts;
const getWeb3 = state => state.web3;
const getStore = state => state;

export default {
  getBounties,
  getWeb3,
  getStore
};
