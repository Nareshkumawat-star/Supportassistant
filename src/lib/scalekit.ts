import { Scalekit } from '@scalekit-sdk/node';

// Initialize the Scalekit client with your credentials
const scalekit = new Scalekit(
  process.env.SCALEKIT_ENVIRONMENT_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!
);
export default scalekit;