import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import { overview } from "./blocks/overview";
import { isPost } from "./utils/isPost";
import axios from "axios";
import { isGenericMessageEvent } from "./utils/helpers";

export const overviewListener = async ({
  message,
  client,
}: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
  // Filter out message events with subtypes (see https://api.slack.com/events/message)
  // Is there a way to do this in listener middleware with current type system?
  if (!isGenericMessageEvent(message)) return;

  const { text } = message;

  if (!text) return;

  const POST_ID_INDEX = 4;

  const words = text.split(/\s+/);
  if (words.length < 1) return;

  const postIds = Array.from(
    new Set(
      words
        .map((word) => {
          const splitted = word.split(/\/|#|>/);
          if (splitted.length < POST_ID_INDEX + 1) return;
          const postId = splitted[POST_ID_INDEX];
          if (isNaN(Number(postId))) return;
          return postId;
        })
        .filter((postId) => !!postId)
    )
  );

  const posts = await Promise.all(
    postIds.map((postId) => {
      return axios(
        `https://api.docbase.io/teams/${process.env.DOCBASE_TEAM_NAME}/posts/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-DocBaseToken": process.env.DOCBASE_TOKEN,
          },
        }
      );
    })
  );

  await Promise.all(
    posts.map(({ data: post }) => {
      if (!isPost(post)) return;
      client.chat.postEphemeral({
        channel: message.channel,
        user: message.user,
        attachments: overview(post).attachments,
      });
    })
  );
};
