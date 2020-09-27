/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/prefer-default-export */
import {
  put, takeLatest, all, select, takeEvery, delay, take
} from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import Actions from '../actions';
import Constants from '../../constants';

// SELECTORS
export const getWeb3 = state => state.ethreducer.web3;

export const getContract = state => state.ethreducer.contract;

export const getDAIContract = state => state.ethreducer.daiContract;

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

function* approveTransaction(action) {
  try {
    let accounts = yield select(getAccounts);
    if (accounts.length === 0) {
      yield put(Actions.getMetaMaskAccounts());
      yield take(ActionTypes.GET_METAMASK_ACCOUNTS_SUCCESS);
      accounts = yield select(getAccounts);
    }
    const dai = yield select(getDAIContract);
    const resp = yield dai.methods
      .transfer(Constants.ContractAddress, action.amount)
      .call({ from: accounts[0] });
    console.log(resp);
  } catch (error) {
    console.error(error);
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
    let accounts = yield select(getAccounts);
    if (accounts.length === 0) {
      yield put(Actions.getMetaMaskAccounts());
      yield take(ActionTypes.GET_METAMASK_ACCOUNTS_SUCCESS);
      accounts = yield select(getAccounts);
    }
    const contract = yield select(getContract);
    yield put(Actions.approveTransaction(action.reward));
    const id = yield contract
      .methods
      .CreateBounty(
        action.repoLink,
        action.reward,
        action.tag,
        action.title,
        action.desc
      )
      .send({ from: accounts[0] })
      .on('reciept', res => res);
    yield delay(1000);
    yield put(Actions.createBountySuccess(id));
    yield put(Actions.disableBountyModal());
    yield put(Actions.fetchBountyIds());
  } catch (error) {
    console.error(error);
    yield put(Actions.createBountyFailed(error.message));
  }
}

// Action watchers
function* watchApproveTransaction() {
  yield takeLatest(ActionTypes.APPROVE_TRANSACTION, approveTransaction);
}

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
  yield takeLatest(ActionTypes.CREATE_BOUNTY, createBounty);
}

export default function* rootSaga() {
  yield all([
    watchApproveTransaction(),
    watchGetBountyIds(),
    watchGetBounty(),
    watchMetaMaskAccounts(),
    watchCreateBounty()
  ]);
}
