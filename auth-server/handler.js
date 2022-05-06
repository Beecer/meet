const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

/**
 * Scopes allows you to set access levels: this is set to readonly for now because you don't have acxcess rights to update the calendard yourself. for more info check out: https://developers.google.com/identity/protocols/oauth2/scopes
 */

const SCOPES = ["https://googleapis.com/auth/calendar.readonly"];

/**
 * Credentials are those values required to get access to you calendar. IF you see "process.env" this means the value is in the config.json file. This is a best practice as it keeps your API secrets hidden. Please remember to add config.json to you .gitignore file.
 */
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://Beecer.github.io/meet/"],
  javascript_origins: ["https://Beecer.github.io", "http://localhost:3000"],
};
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

/**
 * 
 * The first step in the OAuth process is to generate a URL so users can log in with Google and be authorized to see you calendar. After logging in, they'll receive a code as a URL parameter.
 * 
 */

module.exports.getAuthURL = async () => {
  /**
   * 
   * Scopes array passsed to the `scope` option. Any scopes passed must be enabled in the "OAuth consent screen" settings in your project ob you Google Console. Also, any passed scopes are the ones users will see when the consent screen is displayed to them.
   * 
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};