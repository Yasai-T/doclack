# [WIP] doclack

## develop

```bash
cp .env.tmp .env

yarn
yarn start

ngrok http 3000
```

## app config

- create new slack app from https://api.slack.com/apps/new
- config below section
- Install App to your Workspace
- setup environment variables

```
SLACK_SIGNING_SECRET=get from Basic Info page
SLACK_BOT_TOKEN=get from OAuth & Permissions page
DOCBASE_TOKEN=docbase token
DOCBASE_DOMAIN=
DOCBASE_TEAM_NAME=
```

### OAuth & Permissions

#### Bot Token Scopes

- `chat:write`

### Event Subscriptions

- enable events

#### Request URL

`https://~~~~~~~~~~.ngrok.io/slack/events`

- confirm `Verified` is shown

#### Subscribe to bot events

- `message.channels` to public channels
- `message.groups` to private channels
- `message.im` to DM
- `message.mpim` to Group DM
