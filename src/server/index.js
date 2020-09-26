const GithubWebHook = require('express-github-webhook');

const webhookHandler = GithubWebHook({ path: '/api/webhook', secret: 'secret' });
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(webhookHandler);

const tagRegex = /\[(.*?)\]/;

webhookHandler.on('pull_request', (repo, data) => {
  if (data.action !== 'closed' || !data.pull_request.merged) {
    return false;
  }
  const tag = data.pull_request.title.match(tagRegex);
  if (!tag) {
    return false;
  }
});

app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
