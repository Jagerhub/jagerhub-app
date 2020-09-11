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
    route: <BountyFeed />
  },
  Bounty: {
    path: ':bountyId',
    route: <Bounty />
  }
};

export default () => {
  const match = useRouteMatch();
  return (
    <Switch>
      {Object.keys(routes).map((key) => {
        if (routes[key].path !== '' && routes[key].path !== '*') {
          return (
            <Route path={`${match.path}/${routes[key].path}`} key={routes[key].path}>
              {routes[key].route}
            </Route>
          );
        }
        return (
          <Route path={`${routes[key].path}`} key={routes[key].path}>
            {routes[key].route}
          </Route>
        );
      })}
    </Switch>
  );
};
