const { OAuth2Client } = require("google-auth-library");
async function verifyGoogleToken(tokenId: string, aud: string) {
  const client = new OAuth2Client(aud);

  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: aud,
  });

  const payload = ticket.getPayload();
  const userid = payload["sub"];
  const domain = payload["hd"];
}

export default verifyGoogleToken;
