/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Template from './template';
import Actions from '../../redux/actions';

class BountyFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { web3, fetchBountyIds } = this.props;
    web3.eth.getBlock('latest').then(console.log);
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
      <div>
        <Template
          createBounty={newBounty => this.createBountyWithAccount(newBounty)}
          bountyIds={bountyIds}
          showBountyModal={showBountyModal}
          enableModal={enableModal}
          disableModal={disableModal}
          bountyCreating={bountyCreating}
        />
      </div>

    );
  }
}

BountyFeed.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  web3: PropTypes.any.isRequired,
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
