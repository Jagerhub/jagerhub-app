import { combineReducers } from 'redux';
import ethreducer from './eth_reducer';
import modalreducer from './modal_reducer';

export default combineReducers({ ethreducer, modalreducer });
