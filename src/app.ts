import "./utils/env";
import { App, LogLevel } from "@slack/bolt";
import { overviewListener } from "./overviewListener";
import { slashCommands } from "./slashCommands";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
  // for FaaS https://github.com/slackapi/bolt-js/issues/361
  processBeforeResponse: true,
});

app.use(async ({ next }) => {
  // TODO: This can be improved in future versions
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await next!();
});

app.command("/doclack", slashCommands);

// The bot returns a summary of the article that only the user can see
const regex = new RegExp(`https://${process.env.DOCBASE_DOMAIN}/posts/`);
app.message(regex, overviewListener);

(async () => {
  // Start your app
  const port = Number(process.env.PORT) || 3000;
  await app.start(port);

  console.log(`⚡️ Bolt app is running on port ${port}!`);
})();
