const { OAuth2Client } = require("google-auth-library");
async function verifyGoogleToken(tokenId: string) {
  const client = new OAuth2Client(process.env.GOOGLE_APP_ID);

  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_APP_ID,
  });

  const payload = ticket.getPayload();
  const userid = payload["sub"];
  const domain = payload["hd"];
}

export default verifyGoogleToken;
