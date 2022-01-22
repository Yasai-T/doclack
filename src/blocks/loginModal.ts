import { View } from "@slack/bolt";

export const loginModal = (): View => {
  return {
    title: {
      type: "plain_text",
      text: "Login to doclack",
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    type: "modal",
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "input",
        element: {
          type: "plain_text_input",
          action_id: "plain_text_input-action",
        },
        label: {
          type: "plain_text",
          text: "Docbase Token",
          emoji: true,
        },
      },
    ],
  };
};
