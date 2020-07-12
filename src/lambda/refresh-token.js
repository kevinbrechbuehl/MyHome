import axios from "axios";

export async function handler(event) {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", process.env.NETATMO_CLIENT_ID);
  params.append("client_secret", process.env.NETATMO_CLIENT_SECRET);
  params.append("refresh_token", event.queryStringParameters["refresh_token"]);

  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  };

  try {
    const { data } = await axios.post(
      "https://api.netatmo.com/oauth2/token",
      params,
      headers
    );
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    const { status, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, error: data.error })
    };
  }
}
