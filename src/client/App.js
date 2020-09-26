import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  ThemeProvider, AppBar, Button
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';
import Web3Connection from './web3_connection';
import Routes from './Routes';
import StickerFooter from './components/StickyFooter';

import theme from './theme';
import store from './redux/store';
import './app.css';

class App extends Component {
  componentDidMount() {
    // unimplemented
  }

  render() {
    return (
      <Router>
        <AppBar position="sticky" elevation={0}>
          <Toolbar style={{ paddingLeft: 35, paddingRight: 35 }}>
            <Typography variant="h6" style={{ flexGrow: 1, display: 'flex' }}>
              JägerHub
            </Typography>
            <Button component={Link} to="/" color="inherit">About</Button>
            <Button component={Link} to="/bounties" color="inherit">Bounties</Button>
          </Toolbar>
        </AppBar>
        <Routes />
        <StickerFooter />
      </Router>
    );
  }
}

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
