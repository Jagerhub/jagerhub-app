import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Button
} from '@material-ui/core';
import {
  useRouteMatch,
  Link
} from 'react-router-dom';
import Bounty from '../../components/Bounty';

const Template = (props) => {
  const match = useRouteMatch();
  const { bountyIds } = props;
  return (
    <div>
      <Typography variant="h6">
        Jäger Contract
      </Typography>
      <Button color="primary" onClick={props.clickCreateBounty}>MAKE A BOUNTY</Button>
      <Link to={`${match.url}/bounty1`}>Link to bounty 1</Link>
      {bountyIds.map(id => (
        <div>{id}</div>
      ))}
    </div>
  );
};

Template.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bountyIds: PropTypes.array.isRequired,
};

export default Template;
