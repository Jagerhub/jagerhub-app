/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import {
  put, takeLatest, all, select, takeEvery
} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import Actions from '../actions';

// SELECTORS
export const getWeb3 = state => state.ethreducer.web3;

export const getContract = state => state.ethreducer.contract;

export const getAccounts = state => state.ethreducer.accounts;

// SAGAS
// eslint-disable-next-line no-unused-vars
function* getMetaMaskAccounts(action) {
  const web3 = yield select(getWeb3);
  if (window.ethereum) {
    const accounts = yield window.ethereum.enable().then(
      web3.eth.getAccounts((error, result) => {
        if (error) {
          throw new Error(error);
        }
        return result;
      })
    );
    yield put(Actions.getMetaMaskAccountsSuccess(accounts));
  } else {
    throw new Error('NO META MASK EXTENSION');
  }
}

// eslint-disable-next-line no-unused-vars
function* getBountyIds(action) {
  try {
    const contract = yield select(getContract);
    const data = yield contract.methods
      .GetRepoBounties('link')
      .call();
    if (!data) {
      yield put(Actions.fetchBountyIdsFailed('no data'));
    }
    yield put(Actions.fetchBountyIdsSuccess(data));
  } catch (error) {
    console.error(error);
    yield put(Actions.fetchBountyIdsFailed(error.message));
  }
}

function* getBounty(action) {
  console.log('---------GET BOUNTY--------');
  console.log('action.id');
  try {
    const contract = yield select(getContract);
    const data = yield contract
      .methods
      .GetBountyInfo(action.id)
      .call();
    yield put(Actions.fetchBountySuccess(action.id, data));
  } catch (error) {
    console.error(error);
    yield put(Actions.fetchBountyFailed(action.id, error));
  }
}

// eslint-disable-next-line no-unused-vars
function* createBounty(action) {
  try {
    const contract = yield select(getContract);
    const accounts = yield select(getAccounts);
    const id = yield contract
      .methods
      .CreateBounty(
        action.repoLink,
        action.reward,
        action.tag,
        action.title,
        action.desc
      )
      .send({ from: accounts[0] });
    yield put(Actions.createBountySuccess(id));
    yield put(Actions.fetchBounty(id));
  } catch (error) {
    console.error(error);
    yield put(Actions.createBountyFailed(error.message));
  }
}

// Action watchers
function* watchMetaMaskAccounts() {
  yield takeLatest(ActionTypes.GET_METAMASK_ACCOUNTS, getMetaMaskAccounts);
}

function* watchGetBountyIds() {
  yield takeLatest(ActionTypes.FETCH_BOUNTY_IDS, getBountyIds);
}

function* watchGetBounty() {
  yield takeEvery(ActionTypes.FETCH_BOUNTY, getBounty);
}

function* watchCreateBounty() {
  const accounts = yield select(getAccounts);
  if (accounts.length === 0) {
    yield put(Actions.getMetaMaskAccounts());
  }
  yield takeLatest(ActionTypes.CREATE_BOUNTY, createBounty);
}

export default function* rootSaga() {
  yield all([
    watchGetBountyIds(),
    watchGetBounty(),
    watchMetaMaskAccounts(),
    watchCreateBounty()
  ]);
}
