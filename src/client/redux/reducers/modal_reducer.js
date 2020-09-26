import ActionTypes from '../actions/action-types';

const initState = {
  bounty_modal: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case ActionTypes.ENABLE_BOUNTY_MODAL:
      return {
        ...state,
        bounty_modal: true,
      };
    case ActionTypes.DISABLE_BOUNTY_MODAL:
      return {
        ...state,
        bounty_modal: false,
      };
    default:
      return state;
  }
}
