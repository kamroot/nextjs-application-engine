import { showFullDate } from '~/lib/functions/utils';

const getEnvironmentVariable = (envVar: string): string => {
  const unvalidatedEnvVar = process.env[envVar];
  if (!unvalidatedEnvVar) {
    console.log('var', process);
    throw new Error(`config var - ${envVar} is not set`);
  } else {
    return unvalidatedEnvVar;
  }
};

export const config = {
  // NEXT_PUBLIC_SITE_URL: getEnvironmentVariable('NEXT_PUBLIC_SITE_URL'),
  // DATABASE_URL: getEnvironmentVariable('DATABASE_URL'),
  // NEXT_PUBLIC_LOG_LEVEL: getEnvironmentVariable('NEXT_PUBLIC_LOG_LEVEL'),
  // MJ_API_PUBLIC: getEnvironmentVariable('MJ_API_PUBLIC'),
  // MJ_API_PRIVATE: getEnvironmentVariable('MJ_API_PRIVATE'),
  // FORM_EMAIL_SENDER: getEnvironmentVariable('FORM_EMAIL_SENDER'),
  // FORM_EMAIL_NAME: getEnvironmentVariable('FORM_EMAIL_NAME'),
  // FORM_STORAGE_LOCATION: getEnvironmentVariable('FORM_STORAGE_LOCATION'),
  // FORM_EMAIL_TEXTPART: getEnvironmentVariable('FORM_EMAIL_TEXTPART'),
  // SLACK_TEST_URL: getEnvironmentVariable('SLACK_TEST_URL'),
  // SLACK_PROD_URL: getEnvironmentVariable('SLACK_PROD_URL'),
  // NODE_ENV: getEnvironmentVariable('NODE_ENV'),
  // CONFIG_BUILD_ID: showFullDate(),
};

// from https://dev.to/austinshelby/you-are-reading-environment-variables-the-wrong-way-in-nextjs-45da
