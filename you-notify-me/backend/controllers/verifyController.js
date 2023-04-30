import twilio from "twilio";
import * as databaseWriter from "../connectors/databaseWriter.js";

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export async function getCode(req, res) {
  console.log("Received a get code request" + req.query.phoneNumber);
  console.log("Process env=" + process.env.VERIFY_SERVICE_SID);
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
      if (verifyResponse.status != "approved") {
        res.status(400).send({ error: "Incorrect code" });
      }
      res.status(200);
    })
    .catch((error) => {
      if (error.message === "Duplicate entry found") {
        // You can also send a response to the client indicating the duplicate entry
        res.status(409).send({ error: "Duplicate entry found" });
      } else {
        console.error("Error while verifying and subscribing:", error);
      }
    });
}

async function subscribeIfVerified(request, verifyResponse) {
  if (verifyResponse.status == "approved") {
    try {
      await databaseWriter.addWeatherSubscriber(
        request.query.name,
        request.query.phoneNumber,
        request.query.zipcode
      );
    } catch (error) {
      throw error;
    }
  }
  return verifyResponse;
}
