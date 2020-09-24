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
        bounties_loaded: false
      };
    case ActionTypes.FETCH_BOUNTY_IDS_SUCCESS:
      return {
        ...state,
        bounties_loading: false,
        bounties_loaded: true,
        bountyIds: action.data
      };
    case ActionTypes.FETCH_BOUNTY_IDS_FAILED:
      return {
        ...state,
        bounties_loading: false,
        bounties_loaded: false,
        bounties_error: action.error,
      };
    case ActionTypes.FETCH_BOUNTY:
      state.bounties[action.id] = null;
      return state;
    case ActionTypes.FETCH_BOUNTY_SUCCESS:
      state.bounties[action.id] = action.data;
      return state;
    case ActionTypes.FETCH_BOUNTY_FAILED:
      state.bounties[action.id] = { error: action.error };
      return state;
    case ActionTypes.CREATE_BOUNTY:
      return {
        ...state,
        bounty_creating: true
      };
    case ActionTypes.CREATE_BOUNTY_SUCCESS:
      state.bountyIds = [action.id, ...state.bountyIds];
      return {
        ...state,
        bounty_creating: false,
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
