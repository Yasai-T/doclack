import { SayArguments } from "@slack/bolt";
import { DocbasePost } from "../docbaseTypes";
// import slackify from "slackify-markdown";

const WORDS_PER_MIN = 500;

export const overview = (post: DocbasePost): SayArguments => {
  const args: SayArguments = {
    attachments: [
      {
        color: "#304764",
        blocks: [
          {
            type: "header",
            text: {
              type: "mrkdwn",
              text: `<${post.url}|${post.title}>`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              // text: slackify(post.body.slice(0, 1000)),
              text: post.body.slice(0, 1000),
            },
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: "🔑 *Scope*",
              },
              {
                type: "mrkdwn",
                text: "🏷 *Tags*",
              },
              {
                type: "plain_text",
                text: post.scope,
                emoji: true,
              },
              {
                type: "plain_text",
                text: post.tags.map(({ name }) => name).join(", "),
                emoji: true,
              },
            ],
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: "📝 *Comments*",
              },
              {
                type: "mrkdwn",
                text: "⏱ *Reading time*",
              },
              {
                type: "plain_text",
                text: post.comments.length.toString(),
                emoji: true,
              },
              {
                type: "plain_text",
                text: `${Math.ceil(post.body.length / WORDS_PER_MIN)} min`,
                emoji: true,
              },
            ],
          },
        ],
      },
    ],
  };

  return args;
};
