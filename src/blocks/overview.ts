import { SayArguments } from "@slack/bolt";
import { DocbasePost } from "../docbaseTypes";
import slackify from "slackify-markdown";

const WORDS_PER_MIN = 500;

export const overview = (post: DocbasePost): SayArguments => {
  const args: SayArguments = {
    attachments: [
      {
        color: "#304764",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*<${post.url}|${post.title}>*`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: slackify(post.body.slice(0, 1500)),
            },
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `🔑 *Scope*: ${post.scope}`,
              },
              {
                type: "mrkdwn",
                text: `🏷 *Tags*: ${post.tags
                  .map(({ name }) => name)
                  .join(", ")}`,
              },
              {
                type: "mrkdwn",
                text: `📝 *Comments*: ${post.comments.length}`,
              },
              {
                type: "mrkdwn",
                text: `⏱ *Reading time*: ${Math.ceil(
                  post.body.length / WORDS_PER_MIN
                )} min`,
              },
            ],
          },
        ],
      },
    ],
  };

  return args;
};
