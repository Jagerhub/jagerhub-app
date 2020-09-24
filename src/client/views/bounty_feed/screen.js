/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  createBountyWithAccount() {
    const { createBounty } = this.props;
    const newBounty = {
      repoLink: 'link',
      reward: 5,
      tag: 'ABCD',
      title: 'TITLE',
      desc: 'short desc'
    };
    const params = Object.values(newBounty);
    createBounty(...params);
  }

  render() {
    const { bountyIds } = this.props;
    return (
      <Template
        clickCreateBounty={() => this.createBountyWithAccount()}
        bountyIds={bountyIds}
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
  createBounty: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bountyIds: state.ethreducer.bountyIds,
  bounties: state.ethreducer.bounties,
  web3: state.ethreducer.web3,
  contract: state.ethreducer.contract
});

const mapDispatchToProps = {
  fetchBountyIds: Actions.fetchBountyIds,
  createBounty: Actions.createBounty
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BountyFeed);
