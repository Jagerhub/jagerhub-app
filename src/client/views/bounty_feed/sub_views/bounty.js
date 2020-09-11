import React, { Component } from 'react';
import {
  useParams
} from 'react-router-dom';
import { Paper } from '@material-ui/core';

export default class Bounty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...useParams()
    };
  }

  render() {
    const { bountyId } = this.state;
    return (
      <Paper>
        {bountyId}
      </Paper>
    );
  }
}
