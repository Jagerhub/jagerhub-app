import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBounty } from '../../redux/actions';
import Template from './template';

class BountyFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Template />
    );
  }
}

const mapStateToProps = state => ({
  bounties: state.bountyContracts
});

const mapDispatchToProps = {
  addBounty
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BountyFeed);
