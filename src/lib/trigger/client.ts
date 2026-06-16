// import { TriggerClient } from "@trigger.dev/sdk";

// let client: TriggerClient | null = null;

// export function getTriggerClient(): TriggerClient {
//   if (client) {
//     return client;
//   }

//   const secretKey =
//     process.env.TRIGGER_SECRET_KEY;

//   if (!secretKey) {
//     throw new Error(
//       "TRIGGER_SECRET_KEY is missing"
//     );
//   }

//   client = new TriggerClient({
//     id: "nextflow",
//     apiKey: secretKey
//   });

//   return client;
// }