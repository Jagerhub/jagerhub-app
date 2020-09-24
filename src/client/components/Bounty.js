import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import Actions from '../redux/actions';

class Bounty extends Component {
  componentDidMount() {
    const { id, fetchBounty } = this.props;
    fetchBounty(id);
  }

  render() {
    const { bounty } = this.props;
    return (
      <Paper>
        {bounty}
      </Paper>
    );
  }
}

Bounty.propTypes = {
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  bounty: PropTypes.any.isRequired,
  fetchBounty: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  bounty: state.ethreducer.bounties[props.id],
});

const mapDispatchToProps = {
  fetchBounty: Actions.fetchBounty
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bounty);
