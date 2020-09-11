import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import BountyFeed from './views/bounty_feed';

export const Routes = {
  AllBounties: {
    path: '/bounties',
    route: <BountyFeed />,
    title: 'Bounties'
  }
};

export default () => (
  <Switch>
    {Object.keys(Routes).map(key => (
      <Route path={`${Routes[key].path}`} key={Routes[key].path}>
        {Routes[key].route}
      </Route>
    ))}
  </Switch>
);
