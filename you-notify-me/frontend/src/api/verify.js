import axios from "axios";

export async function getCode(phoneNumber) {
  axios
    .get("http://localhost:8000/verify/getcode", {
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
      "http://localhost:8000/verify/verifyandsubscribe",
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
