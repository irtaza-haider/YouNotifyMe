import axios from "axios";
import API_BASE_URL from "../config";

export async function getCode(phoneNumber) {
  console.log("The path=" + API_BASE_URL);
  axios
    .get(`${API_BASE_URL}/verify/getcode`, {
      params: {
        phoneNumber: phoneNumber,
      },
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

export async function verifyCodeAndSubscribe(code, name, phoneNumber, zipcode) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/verify/verifyandsubscribe`,
      {
        params: {
          code: code,
          name: name,
          phoneNumber: phoneNumber,
          zipcode: zipcode,
        },
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
}
