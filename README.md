# Jager Hub
JägerHub is a distributed platform where you can hire talent for your opensource projects without going through time consuming legal hurdles or even speaking to them. 

It works by storing bounties on in our smart contract with unique tags and a reward of DAI, a stable currency. When a hunter wants to complete a listed bounty, it's as simple as making a pull request with the tag in the title and putting their wallet id in the body of the PR.

As a Jäger you can rest easy that if your code gets merged, you will get paid.

## You can create a new bounty with just a click of a button
![Create Bounty](public/create_button.png?raw=true "CreateBounty")

By connecting your github to our server with a webhook, our smart contract will be notified when a pull request is merged to your repository.
![Webhooks](public/webhook1.png?raw=true "Webhook1")

# Tech Stack
JagerHub is developed mainly in react with redux and saga middlewares. We have a simple backend written in express to act as an intermediary with github webhooks.

Before running the server(s) run:
```
npm install
```
Run frontend and backend as dev with:
```
npm run-script dev
```
Build and start for production
```
npm start
```
