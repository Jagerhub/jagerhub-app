const GithubWebHook = require('express-github-webhook');

const webhookHandler = GithubWebHook({ path: '/api/webhook' });
const express = require('express');
const bodyParser = require('body-parser');
const Web3Conn = require('../client/web3_connection/server_conn');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(webhookHandler);
const contract = Web3Conn.Contract();
const tagRegex = /\[(.*?)\]/;

app.get('/api/test', (req, res) => {
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
  console.log(`recieved tag: ${tag[1]}`);
  if (!tag) {
    return false;
  }
  const repoName = data.repository.full_name;
  const prId = data.pull_request.id;
  contract
    .requestBountyComplete(repoName, prId)
    .then((result) => {
      console.log(result);
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
