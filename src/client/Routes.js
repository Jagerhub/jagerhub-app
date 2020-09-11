import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import BountyFeed from './views/bounty_feed';
import About from './views/about';

const RouteObjects = {
  About: {
    path: '/',
    route: About,
    title: 'About'
  },
  AllBounties: {
    path: '/bounties',
    route: BountyFeed,
    title: 'Bounties'
  },
  BadRoute: {
    path: '*',
    route: () => (<div>404</div>),
    title: '404'
  }
};

export default () => (
  <Switch>
    <Route exact path={`${RouteObjects.About.path}`} component={RouteObjects.About.route} />
    <Route path={`${RouteObjects.AllBounties.path}`} component={RouteObjects.AllBounties.route} />
    <Route path={`${RouteObjects.BadRoute.path}`} component={RouteObjects.BadRoute.route} />
  </Switch>
);
