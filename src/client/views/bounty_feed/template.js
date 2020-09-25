import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Button, Paper, Grid, makeStyles, InputBase, fade
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import {
  useRouteMatch
} from 'react-router-dom';
import Bounty from '../../components/Bounty';

import CreateBountyForm from './sub_views/create_bounty_form';

const styles = makeStyles(theme => ({
  bounties_list: {
    padding: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    marginBottom: '10px',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  addBountyButton: {
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    right: '5%',
    color: '#ffffff',
    background: `linear-gradient(45deg, ${theme.palette.secondary.main} 20%, ${theme.palette.primary.main} 90%)`,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  }
}));

const Template = (props) => {
  const match = useRouteMatch();
  const classes = styles();
  const {
    bountyIds, showBountyModal, createBounty, enableModal, disableModal, bountyCreating
  } = props;
  return (
    <div>
      <CreateBountyForm
        open={showBountyModal}
        handleClose={disableModal}
        createBounty={createBounty}
        loading={bountyCreating}
      />
      {/* <Link to={`${match.url}/bounty1`}>Link to bounty 1</Link> */}
      <Paper className={classes.bounties_list}>
        <Button className={classes.addBountyButton} onClick={enableModal}>
          <AddIcon />
        </Button>
        <Typography variant="h6">
          Bounties
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Grid container spacing={4}>
          {bountyIds.map(id => (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <Bounty id={id} />
            </Grid>
          ))}
        </Grid>
      </Paper>

    </div>
  );
};

Template.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  bountyIds: PropTypes.array.isRequired,
  createBounty: PropTypes.func.isRequired,
  bountyCreating: PropTypes.bool.isRequired,
  showBountyModal: PropTypes.bool.isRequired,
  enableModal: PropTypes.func.isRequired,
  disableModal: PropTypes.func.isRequired
};

export default Template;
