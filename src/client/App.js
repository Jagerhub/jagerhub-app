import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  ThemeProvider, AppBar
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Routes from './Routes';

import theme from './theme';
import store from './redux/store';
import './app.css';

class App extends Component {
  componentDidMount() {
    // Unimplemented
  }

  render() {
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6">
              Jäger Contract
            </Typography>
          </Toolbar>
        </AppBar>
        <Router>
          <Routes />
        </Router>
      </div>
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
