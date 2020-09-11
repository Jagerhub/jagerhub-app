import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';

import FirstCard from './cards/first_card';
import SecondCard from './cards/second_card';

const styles = makeStyles(theme => ({
  backgroundPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white.main
  },
  backgroundSecondary: {
    backgroundColor: theme.palette.gray.main,
  }
}));

export default () => {
  const classes = styles();
  return (
    <div>
      <Paper square>
        <FirstCard />
      </Paper>
      <Paper square className={classes.backgroundPrimary}>
        <SecondCard />
      </Paper>
    </div>
  );
};
