// // This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// // The config you add here will be used whenever one of the edge features is loaded.
// // Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// // https://docs.sentry.io/platforms/javascript/guides/nextjs/

// import * as Sentry from "@sentry/nextjs";

// Sentry.init({
//   dsn: "https://b206184937e38fdc86bebc8d4470dcfd@o4508806607011840.ingest.us.sentry.io/4508806613893120",

//   // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
//   tracesSampleRate: 1,

//   // Setting this option to true will print useful information to the console while you're setting up Sentry.
//   debug: false,
// });
