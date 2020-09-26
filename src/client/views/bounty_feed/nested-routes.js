import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
import Bounty from './sub_views/bounty';
import BountyFeed from './screen';

export const routes = {
  AllBounties: {
    path: '',
    route: BountyFeed
  },
  Bounty: {
    path: ':bountyId',
    route: Bounty
  },
  BadRoute: {
    path: '*',
    route: () => (<div>404</div>)
  }
};

export default () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route
        exact
        path={`${match.path}/${routes.AllBounties.path}`}
        component={routes.AllBounties.route}
      />
      <Route
        path={`${match.path}/${routes.Bounty.path}`}
        component={routes.Bounty.route}
      />
      <Route
        path={`${match.path}/${routes.BadRoute.path}`}
        component={routes.BadRoute.route}
      />
    </Switch>
  );
};
