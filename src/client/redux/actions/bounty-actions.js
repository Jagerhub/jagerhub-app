/* eslint-disable import/prefer-default-export */
import { ADD_BOUNTY } from './action-types';

export const addBounty = bounty => ({
  type: ADD_BOUNTY,
  payload: {
    bounty
  }
});
