import { config } from '~/lib/functions/config';

const sendSlackMessage = (message) => {
  fetch(process.env.SLACK_TEST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: message,
      //   blocks: [
      //     {
      //       type: 'section',
      //       text: {
      //         type: 'mrkdwn',
      //         text: `${namespace.padEnd(5, ' ')} - ${message}`,
      //       },
      //     },
      //   ],
      // }),
    }),
  });
};

export default sendSlackMessage;
