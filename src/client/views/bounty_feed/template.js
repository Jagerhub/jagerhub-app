import React from 'react';
import {
  Typography
} from '@material-ui/core';
import {
  useRouteMatch,
  Link
} from 'react-router-dom';

export default () => {
  const match = useRouteMatch();
  return (
    <div>
      <Typography variant="h6">
        Jäger Contract
      </Typography>
      <Link to={`${match.url}/bounty1`}>Link to bounty 1</Link>
    </div>
  );
};
