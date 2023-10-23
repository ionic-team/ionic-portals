/**
 * @typedef {import("./definitions").Release} Release
 * @typedef {import("@slack/web-api").ChatPostMessageArguments} ChatPostMessageArguments
 */
import { WebClient } from "@slack/web-api";

// This is a specific channel to share updates to.
const SLACK_CONVERSATION_ID = "C061QQ33UEB";

/**
 *
 * @param {Release[]} slackUpdateList
 * @returns {Promise<void>}
 */
export async function postUpdatesToSlack(slackUpdateList) {
  const token = process.env.SLACK_TOKEN;
  const web = new WebClient(token);
  const testResult = await web.auth.test({ token });

  if (testResult.ok) {
    console.log("sending to slack");
  } else {
    console.error(JSON.stringify(testResult, null, 2));
  }

  const slackBlocks = slackUpdateList
    .sort((a, b) => {
      return new Date(a.raw_published_at) - new Date(b.raw_published_at);
    })
    .map(({ version, published_at, type, productTitle, mdBody, pageUrl }) => ({
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `-------------------------------------\n` +
          `*${productTitle} Release ${version}* (${type}) ${published_at}\n` +
          `\n${markdownToSlackMarkdown(mdBody)}` +
          `<${pageUrl}#release-${version}|shareable link>`,
      },
    }));

  await web.chat.postMessage({
    text: "This is text",
    blocks: slackBlocks,
    channel: SLACK_CONVERSATION_ID,
  });
}

function markdownToSlackMarkdown(markdown) {
  return markdown
    .replace(/\*\*(\S+)\*\*/g, (all, one) => `*${one}*`)
    .replace(/\[(\S+)\]\((\S+?)\)/g, (all, one, two) => `<${two}|${one}>`)
    .replace(/\n\* /g, "\n- ")
    .replace(/#+ (.*)\n/, (all, word) => `*${word}*\n`);
}
