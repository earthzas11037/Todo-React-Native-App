/* eslint-env node */
/*
 * Env file to load and validate env variables
 * Be cautious; this file should not be imported into your source folder.
 * We split the env variables into two parts:
 * 1. Client variables: These variables are used in the client-side code (src folder).
 * 2. Build-time variables: These variables are used in the build process (app.config.ts file).
 * Import this file into the `app.config.ts` file to use environment variables during the build process. The client variables can then be passed to the client-side using the extra field in the `app.config.ts` file.
 * To access the client environment variables in your `src` folder, you can import them from `@env`. For example: `import Env from '@env'`.
 */
/**
 * 1st part: Import packages and Load your env variables
 * we use dotenv to load the correct variables from the .env file based on the APP_ENV variable (default is development)
 * APP_ENV is passed as an inline variable while executing the command, for example: APP_ENV=staging pnpm build:android
 */
const z = require('zod')

const packageJSON = require('./package.json')
const path = require('path')
const APP_ENV = process.env.APP_ENV ?? 'development'
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`)

require('dotenv').config({
  path: envPath
})

/**
 * 2nd part: Define some static variables for the app
 * Such as: bundle id, package name, app name.
 *
 * You can add them to the .env file but we think it's better to keep them here as as we use prefix to generate this values based on the APP_ENV
 * for example: if the APP_ENV is staging, the bundle id will be com.myapp.staging
 */

// TODO: Replace these values with your own

const BUNDLE_ID = 'co.th.expo.starter.kit.inspection.app' // ios bundle id
const PACKAGE = 'co.th.expo.starter.kit.inspection.app' // android package name
const NAME = 'Expo Starter Kit' // app name
const SLUG = 'expo-starter-kit-app' // app name
const EXPO_ACCOUNT_OWNER = 'expo-starter-kit' // expo account owner
const EAS_PROJECT_ID = '' // eas project id
const SCHEME = 'expo-starter-kit' // app scheme

/**
 * We declare a function withEnvSuffix that will add a suffix to the variable name based on the APP_ENV
 * Add a suffix to variable env based on APP_ENV
 * @param {string} name
 * @returns  {string}
 */

const withEnvSuffix = name => {
  return APP_ENV === 'production' ? name : `${name}.${APP_ENV}`
}

/**
 * 2nd part: Define your env variables schema
 * we use zod to define our env variables schema
 *
 * we split the env variables into two parts:
 *    1. client: These variables are used in the client-side code (`src` folder).
 *    2. buildTime: These variables are used in the build process (app.config.ts file). You can think of them as server-side variables.
 *
 * Main rules:
 *    1. If you need your variable on the client-side, you should add it to the client schema; otherwise, you should add it to the buildTime schema.
 *    2. Whenever you want to add a new variable, you should add it to the correct schema based on the previous rule, then you should add it to the corresponding object (_clientEnv or _buildTimeEnv).
 *
 * Note: `z.string()` means that the variable exists and can be an empty string, but not `undefined`.
 * If you want to make the variable required, you should use `z.string().min(1)` instead.
 * Read more about zod here: https://zod.dev/?id=strings
 *
 */

const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  SCHEME: z.string(),
  SLUG: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  APP_VERSION: z.string(),
  APP_BUILD_NUMBER: z.string(),

  // ADD YOUR CLIENT ENV VARS HERE
  API_URL: z.string(),
  APP_VERSION_API_KEY: z.string(),
  SENTRY_DSN: z.string(),
  SENTRY_PROJECT: z.string(),
  SENTRY_ORG: z.string(),
  SENTRY_AUTH_TOKEN: z.string()
})

const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string()
  // ADD YOUR BUILD TIME ENV VARS HERE
})

/**
 * @type {Record<keyof z.infer<typeof client> , unknown>}
 */
const _clientEnv = {
  APP_ENV,
  NAME: NAME,
  SCHEME: SCHEME,
  SLUG: SLUG,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,

  APP_VERSION: process.env.APP_VERSION,
  APP_BUILD_NUMBER: process.env.APP_BUILD_NUMBER,

  // ADD YOUR ENV VARS HERE TOO
  API_URL: process.env.API_URL,
  APP_VERSION_API_KEY: process.env.APP_VERSION_API_KEY,
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN
}

/**
 * @type {Record<keyof z.infer<typeof buildTime> , unknown>}
 */
const _buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID
  // ADD YOUR ENV VARS HERE TOO
}

/**
 * 3rd part: Merge and Validate your env variables
 * We use zod to validate our env variables based on the schema we defined above
 * If the validation fails we throw an error and log the error to the console with a detailed message about missed variables
 * If the validation passes we export the merged and parsed env variables to be used in the app.config.ts file as well as a ClientEnv object to be used in the client-side code
 **/
const _env = {
  ..._clientEnv,
  ..._buildTimeEnv
}

const merged = buildTime.merge(client)
const parsed = merged.safeParse(_env)

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -c flag to clear the cache.`
  )
  throw new Error('Invalid environment variables, Check terminal for more details ')
}

const Env = parsed.data
const ClientEnv = client.parse(_clientEnv)

module.exports = {
  Env,
  ClientEnv,
  withEnvSuffix
}
