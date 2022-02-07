import twilio from "twilio";
import * as databaseWriter from "../connectors/databaseWriter.js";

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export async function getCode(req, res) {
  console.log("Received a get code request" + req.query.phoneNumber);
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verifications.create({
      to: `+${req.query.phoneNumber}`,
      channel: "sms",
    })
    .then((data) => {
      res.status(200).send(data);
    });
}

export async function verifyAndSubscribe(req, res) {
  console.log(
    "Received a verify request with phone number" + req.query.phoneNumber
  );
  client.verify
    .services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: `+${req.query.phoneNumber}`,
      code: req.query.code,
    })
    .then((verifyResponse) => subscribeIfVerified(req, verifyResponse))
    .then((verifyResponse) => {
      res.status(200).send(verifyResponse.status == "approved");
    })
    .catch((e) => {
      console.log("The error is " + e);
    });
}

function subscribeIfVerified(request, verifyResponse) {
  if (verifyResponse.status == "approved") {
    databaseWriter.addWeatherSubscriber(
      request.query.name,
      request.query.phoneNumber,
      request.query.zipcode
    );
  }
  return verifyResponse;
}
