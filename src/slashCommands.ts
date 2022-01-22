import { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { loginModal } from "./blocks/loginModal";

export const slashCommands = async ({
  say,
  body,
  context,
  payload,
  client,
  ack,
}: SlackCommandMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();

  console.log({ body, context, payload });

  if (body.text === "login") {
    try {
      client.views.open({
        token: context.botToken,
        trigger_id: payload.trigger_id,
        view: loginModal(),
      });
    } catch (error) {
      console.log(error);
    }
  }
};
