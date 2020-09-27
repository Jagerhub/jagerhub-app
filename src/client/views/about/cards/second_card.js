import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Image from 'material-ui-image';

import CreateButton from '../../../../../public/create_button.png';
import webhook1 from '../../../../../public/webhook1.png';
import webhook2 from '../../../../../public/webhook2.png';
import webhook3 from '../../../../../public/webhook3.png';


const useStyles = makeStyles(theme => ({
  textContent: {
    color: theme.palette.white,
    padding: theme.spacing(8, 0, 6),
  },
  paragraph: {
    fontSize: 22
  },
  divider: {
    paddingTop: 2,
    backgroundColor: theme.palette.secondary.main
  },
  divWithMargin: {
    marginTop: '100px',
    paddingTop: 2,
    backgroundColor: theme.palette.secondary.main
  }

}));

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.textContent}>
        <Typography color="inherit" component="h1" variant="h2">How does it work...</Typography>
        <Divider className={classes.divider} variant="middle" />
        <Typography color="inherit" component="h1" variant="h4">As a Jäger?</Typography>
        <Divider className={classes.divider} variant="middle" />
        <Typography className={classes.paragraph} align="center" color="inherit" paragraph>
          Go to the repo in the bounty. Make a branch and start coding!
        </Typography>
        <Typography className={classes.paragraph} align="center" color="inherit" paragraph>
          When you're done with the feature, make a pull request with the bounty's pr tag in the title and your wallet id in the body and you'll get paid!
        </Typography>
        <Divider className={classes.divWithMargin} variant="middle" />
        <Typography color="inherit" component="h1" variant="h4">As a repository owner?</Typography>
        <Divider className={classes.divider} variant="middle" />
        <Typography className={classes.paragraph} align="center" color="inherit" paragraph>
          You must have the MetaMask Extension installed.
          Then you can create a bounty through the UI.
        </Typography>
        <img
          aspectRatio={4 / 1}
          alt="Create Bounty Button"
          src={CreateButton}
          style={{ maxWidth: '80%' }}
        />
        <Typography className={classes.paragraph} align="center" color="inherit" paragraph>
          Then you have to set a webhook with our webhook url for 'pull requests' on you repo's page.
        </Typography>
        <img
          aspectRatio={4 / 1}
          alt="Create Bounty Button"
          src={webhook1}
          style={{ maxWidth: '80%' }}
        />
        <img
          aspectRatio={4 / 1}
          alt="Create Bounty Button"
          src={webhook2}
          style={{ maxWidth: '80%' }}
        />
        <img
          aspectRatio={4 / 1}
          alt="Create Bounty Button"
          src={webhook3}
          style={{ maxWidth: '80%' }}
        />

      </div>

    </React.Fragment>
  );
}
