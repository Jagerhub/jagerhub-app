/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { defaultProps } from 'prop-types';
import Template from './template';
import Actions from '../../redux/actions';

async function getUsers(contract) {
  const result = await contract.methods.GetUsers().call();
  console.log(result);
}

class BountyFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { web3, fetchBountyIds, contract } = this.props;
    web3.eth.getBlock('latest').then(console.log);
    getUsers(contract);
    fetchBountyIds();
  }

  createBountyWithAccount(newBounty) {
    const { createBounty } = this.props;
    const params = Object.values(newBounty);
    createBounty(...params);
  }

  render() {
    const {
      bountyIds, showBountyModal, enableModal, disableModal, bountyCreating
    } = this.props;
    return (
      <Template
        createBounty={newBounty => this.createBountyWithAccount(newBounty)}
        bountyIds={bountyIds}
        showBountyModal={showBountyModal}
        enableModal={enableModal}
        disableModal={disableModal}
        bountyCreating={bountyCreating}
      />
    );
  }
}

BountyFeed.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  web3: PropTypes.any.isRequired,
  contract: PropTypes.any.isRequired,
  bountyIds: PropTypes.array.isRequired,
  fetchBountyIds: PropTypes.func.isRequired,
  createBounty: PropTypes.func.isRequired,
  showBountyModal: PropTypes.bool.isRequired,
  enableModal: PropTypes.func.isRequired,
  disableModal: PropTypes.func.isRequired,
  bountyCreating: PropTypes.bool
};

BountyFeed.defaultProps = {
  bountyCreating: false
};

const mapStateToProps = state => ({
  bountyIds: state.ethreducer.bountyIds,
  bounties: state.ethreducer.bounties,
  web3: state.ethreducer.web3,
  contract: state.ethreducer.contract,
  showBountyModal: state.modalreducer.bounty_modal,
  bountyCreating: state.ethreducer.bounty_creating
});

const mapDispatchToProps = {
  fetchBountyIds: Actions.fetchBountyIds,
  createBounty: Actions.createBounty,
  enableModal: Actions.enableBountyModal,
  disableModal: Actions.disableBountyModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BountyFeed);
