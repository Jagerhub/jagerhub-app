/* eslint-disable import/prefer-default-export */
import ActionTypes from './action-types';
// MetaMask actions
export const getMetaMaskAccounts = callback => ({
  type: ActionTypes.GET_METAMASK_ACCOUNTS,
  callback
});

export const getMetaMaskAccountsSuccess = accounts => ({
  type: ActionTypes.GET_METAMASK_ACCOUNTS_SUCCESS,
  accounts
});

// Fetch Ids
export const fetchBountyIds = () => ({
  type: ActionTypes.FETCH_BOUNTY_IDS,
});

export const fetchBountyIdsSuccess = data => ({
  type: ActionTypes.FETCH_BOUNTY_IDS_SUCCESS,
  data
});

export const fetchBountyIdsFailed = error => ({
  type: ActionTypes.FETCH_BOUNTY_IDS_SUCCESS,
  error
});

// FETCH BOUNTY INFO
export const fetchBounty = id => ({
  type: ActionTypes.FETCH_BOUNTY,
  id
});

export const fetchBountySuccess = (id, data) => ({
  type: ActionTypes.FETCH_BOUNTY_SUCCESS,
  id,
  data
});

export const fetchBountyFailed = (id, error) => ({
  type: ActionTypes.FETCH_BOUNTY_FAILED,
  id,
  error
});

// Create new bounty
export const createBounty = (repoLink, reward, tag, title, desc) => ({
  type: ActionTypes.CREATE_BOUNTY,
  repoLink,
  reward,
  tag,
  title,
  desc
});

export const createBountySuccess = () => ({
  type: ActionTypes.CREATE_BOUNTY_SUCCESS
});

export const createBountyFailed = error => ({
  type: ActionTypes.CREATE_BOUNTY_FAILED,
  error
});
