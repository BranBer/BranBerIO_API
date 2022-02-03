import { AuthenticationError } from "apollo-server-express";
import axios from "axios";
import verifyGoogleToken from "./google";

interface facebook_debug_data {
  is_valid: boolean;
  app_id: string | number;
}

const verifyFacebookToken = async (inputToken: string) => {
  let accessToken = `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`;
  let url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

  let data = await (await axios.get<facebook_debug_data>(url)).data;

  console.log("VERIFY DATA");
  console.log(data);

  if (!data.is_valid || data.app_id !== process.env.FACEBOOK_APP_ID) {
    throw new AuthenticationError(
      "Something went wrong when verifying facebook login"
    );
  }

  return data;
};

export default verifyFacebookToken;
