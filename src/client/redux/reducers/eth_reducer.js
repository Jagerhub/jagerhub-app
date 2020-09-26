/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-named-as-default-member */
import Web3Connection, { Contract } from '../../web3_connection';
import ActionTypes from '../actions/action-types';

const initState = {
  web3: Web3Connection(),
  contract: Contract(),
  accounts: [],
  bountyIds: [],
  bounties: {}
};

export default function (state = initState, action) {
  let newBounties = null;
  switch (action.type) {
    case ActionTypes.GET_METAMASK_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.accounts
      };
    case ActionTypes.FETCH_BOUNTY_IDS:
      return {
        ...state,
        bounties_loading: true,
      };
    case ActionTypes.FETCH_BOUNTY_IDS_SUCCESS:
      return {
        ...state,
        bounties_loading: false,
        bountyIds: action.data
      };
    case ActionTypes.FETCH_BOUNTY_IDS_FAILED:
      return {
        ...state,
        bounties_loading: false,
        bounties_error: action.error,
      };
    case ActionTypes.FETCH_BOUNTY:
      newBounties = state.bounties;
      newBounties[action.id] = null;
      return {
        ...state,
        bounties: newBounties
      };
    case ActionTypes.FETCH_BOUNTY_SUCCESS:
      newBounties = state.bounties;
      newBounties[action.id] = action.data;
      return {
        ...state,
        bounties: newBounties
      };
    case ActionTypes.FETCH_BOUNTY_FAILED:
      newBounties = state.bounties;
      newBounties[action.id] = { error: action.error };
      return {
        ...state,
        bounties: newBounties
      };
    case ActionTypes.CREATE_BOUNTY:
      return {
        ...state,
        bounty_creating: true
      };
    case ActionTypes.CREATE_BOUNTY_SUCCESS:
      return {
        ...state,
        bounty_creating: false
      };
    case ActionTypes.CREATE_BOUNTY_FAILED:
      return {
        ...state,
        bounty_creating: false,
        bounty_creating_error: action.error
      };
    default:
      return state;
  }
}
