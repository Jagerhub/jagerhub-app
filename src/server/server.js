const GithubWebHook = require('express-github-webhook');

const webhookHandler = GithubWebHook({ path: '/api/webhook' });
const express = require('express');
const bodyParser = require('body-parser');
const Web3Conn = require('../client/web3_connection/server_conn');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(webhookHandler);

const tagRegex = /\[(.*?)\]/;

app.get('/api/test', (req, res) => {
  const contract = Web3Conn.Contract();
  contract
    .GetRepoBounties('link')
    .then((result) => {
      console.log(result);
      res.send(200);
    })
    .catch((err) => {
      console.error(err.message);
      res.send(500);
    });
});

webhookHandler.on('pull_request', (repo, data) => {
  if (data.action !== 'closed' || !data.pull_request.merged) {
    return false;
  }
  const tag = data.pull_request.title.match(tagRegex);
  if (!tag) {
    return false;
  }
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
