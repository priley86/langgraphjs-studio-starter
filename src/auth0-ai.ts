import { SUBJECT_TOKEN_TYPES } from "@auth0/ai";
import { Auth0AI, type ToolWrapper } from "@auth0/ai-langchain";

const auth0AI = new Auth0AI({
  auth0: {
    domain: process.env.AUTH0_DOMAIN!,
    clientId: process.env.RESOURCE_SERVER_CLIENT_ID!, // Resource server client ID for token exchange
    clientSecret: process.env.RESOURCE_SERVER_CLIENT_SECRET!, // Resource server client secret
  },
});

const withAccessTokenForConnection = (connection: string, scopes: string[]) =>
  auth0AI.withTokenForConnection({
    connection,
    scopes,
    accessToken: async (_, config) => {
      return config.configurable._credentials.accessToken;
    },
    subjectTokenType: SUBJECT_TOKEN_TYPES.SUBJECT_TYPE_ACCESS_TOKEN,
  });

export const withGoogleCalendar: ToolWrapper = withAccessTokenForConnection(
  "google-oauth2",
  ["https://www.googleapis.com/auth/calendar.freebusy"]
);

export const withGoogleCalendarCommunity: ToolWrapper =
  withAccessTokenForConnection("google-oauth2", [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ]);
