/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CircularProgress, withStyles, Card, CardContent, Typography, Container, CardHeader
} from '@material-ui/core';
import Actions from '../redux/actions';

const styles = theme => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white.main
  },
  content: {
    flexGrow: 1,
    padding: 20
  },
  rewardContainer: {
    position: 'absolute',
    top: '2%',
    right: '-35%',
    color: theme.palette.money
  }
});

class Bounty extends Component {
  componentDidMount() {
    const { id, fetchBounty } = this.props;
    fetchBounty(id);
  }

  render() {
    const { bounty, classes } = this.props;
    if (bounty === null) {
      return (
        <CircularProgress />
      );
    }
    if (bounty.error) {
      return (
        <Card className={classes.container}>
          Error loading bounty:
          {' '}
          {bounty.error}
        </Card>
      );
    }
    return (
      <Card className={classes.container}>
        <CardContent className={classes.content}>
          <Container className={classes.rewardContainer}>
            <Typography gutterBottom component="h4">
              {bounty.reward}
              {' '}
              DAI
            </Typography>
          </Container>
          <Typography gutterBottom variant="h5" component="h2">
            [
            {bounty.tag}
            ]
            {' '}
            {bounty.title}
          </Typography>
          <Typography>
            {bounty.description}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Bounty.propTypes = {
  id: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  bounty: PropTypes.any,
  fetchBounty: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

Bounty.defaultProps = {
  bounty: null
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
)(withStyles(styles)(Bounty));
