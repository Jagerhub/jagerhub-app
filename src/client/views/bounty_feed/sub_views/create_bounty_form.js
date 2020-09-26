/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounty: {
        repoLink: 'link',
        reward: 5,
        tag: 'ABCD',
        title: 'YOUR NICE TITLE',
        desc: 'A SHORT DESCRIPTION'
      }
    };
  }

  inputOnChange(event, state) {
    const { bounty } = state;
    bounty[event.target.id] = event.target.value;
    this.setState({
      bounty
    });
  }

  renderContent() {
    const {
      handleClose, createBounty
    } = this.props;
    return (
      <div>
        <DialogTitle id="form-dialog-title">Create A New Bounty</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the fields below to create your bounty! The pull request tag
            is used by Jäger's to match their PR with your bounty so they get paid.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            value={this.state.bounty.title}
            onChange={e => this.inputOnChange(e, this.state)}
          />
          <TextField
            margin="dense"
            id="tag"
            label="Pull Request Tag"
            value={this.state.bounty.tag}
            onChange={e => this.inputOnChange(e, this.state)}
          />
          <TextField
            margin="dense"
            id="reward"
            label="Reward (in DAI)"
            type="number"
            value={this.state.bounty.reward}
            onChange={e => this.inputOnChange(e, this.state)}
          />
          <TextField
            margin="dense"
            id="repoLink"
            label="Repo Link"
            type="link"
            value={this.state.bounty.repoLink}
            onChange={e => this.inputOnChange(e, this.state)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="desc"
            label="Short Description"
            value={this.state.bounty.desc}
            onChange={e => this.inputOnChange(e, this.state)}
            fullWidth
            multiline
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => createBounty(this.state.bounty)} color="primary">
            Create
          </Button>
        </DialogActions>
      </div>
    );
  }

  render() {
    const {
      open, handleClose, loading
    } = this.props;
    return (
      <div>
        <Dialog disableBackdropClick={loading} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          {!loading ? this.renderContent() : <CircularProgress />}
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  createBounty: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
