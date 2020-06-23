export async function handler(event) {
  const clientId = process.env.NETATMO_CLIENT_ID;
  const redirectUri = event.queryStringParameters["redirect_uri"];
  const scope = event.queryStringParameters["scope"];
  const state = event.queryStringParameters["state"];

  return {
    statusCode: 301,
    headers: {
      Location:
        `https://api.netatmo.com/oauth2/authorize` +
        `?client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&scope=${scope}` +
        `&state=${state}`
    }
  };
}
