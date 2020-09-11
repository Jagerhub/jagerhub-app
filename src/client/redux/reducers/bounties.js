import { ADD_BOUNTY } from '../actions/action-types';

const initState = {
  bountyContracts: []
};

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_BOUNTY: {
      const { newBounty } = action.payload;
      return {
        ...state,
        bountyContracts: [
          ...state.bountyContracts,
          newBounty
        ]
      };
    }
    default:
      return state;
  }
}
