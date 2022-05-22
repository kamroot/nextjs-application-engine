import chalk from 'chalk';
import { config } from '~/lib/functions/config';
import sendSlackMessage from '~/lib/functions/send-slack-message';

// log to console if this is a dev environment or if the log level is set to debug
export const log = (namespace: string, message: string) => {
  if (process.env.NODE_ENV === 'development') console.log(`${chalk.blue(namespace.padEnd(5, ' '))} - ${message}`);
  sendSlackMessage(`${namespace.padEnd(5, ' ')} - ${message}`);
};

export const debug = (namespace: string, message: string) => {
  if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') console.log(`${chalk.blue(namespace.padEnd(5, ' '))} - ${message}`);
};
