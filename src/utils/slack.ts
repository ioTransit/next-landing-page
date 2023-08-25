import {
  IncomingWebhook,
  type IncomingWebhookSendArguments,
} from "@slack/webhook";

const slackWebHook = (envKey: string) => {
  const url = process.env[envKey];
  if (!url) throw Error("IncomingWebhook is missing url");
  return new IncomingWebhook(url);
};

export const slackMessage = {
  general: async (message: string | IncomingWebhookSendArguments) =>
    await slackWebHook("GENERAL_WEB_NOTIFICATIONS_SLACK_HOOK").send(message),
};

const messageBody = {
  username: "Lead notifier",
  text: "New Lead from landing page", // <> are used for linking
  icon_emoji: ":moneybag:",
  attachments: [
    // attachments, here we also use long attachment to use more space
    {
      color: "#f15a24",
      fields: [
        {
          title: "Landing Page",
          value: "Production",
          short: true,
        },
        {
          title: "Agency",
          value: "4€",
          short: true,
        },
        {
          title: "Signed up for blog",
          value: "false",
          short: true,
        },
        {
          title: "Time",
          value: "Awesome Product",
          short: true,
        },
        {
          title: "Additional notes from user",
          value: "Extra long notes from the user about important things.",
          short: false, // marks this to be wide attachment
        },
      ],
      actions: [
        // Slack supports many kind of different types, we'll use buttons here
        // {
        //   type: "button",
        //   text: "Show order", // text on the button
        //   url: "http://example.com", // url the button will take the user if clicked
        // },
        {
          type: "button",
          text: "Follow up with contact",
          style: "primary", // you can have buttons styled either primary or danger
          url: "http://example.com",
        },
        // {
        //   type: "button",
        //   text: "Cancel order",
        //   style: "danger",
        //   url: "http://example.com/order/1/cancel",
        // },
      ],
    },
  ],
} satisfies IncomingWebhookSendArguments;

export const testSend = async () => {
  await slackMessage.general(messageBody).catch((e) => console.error(e));
};
