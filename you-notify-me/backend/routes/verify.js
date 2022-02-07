import express from "express";
import {
  getCode,
  verifyAndSubscribe,
} from "../controllers/verifyController.js";
const verifyRouter = express.Router();

verifyRouter.get("/getcode", getCode);
verifyRouter.get("/verifyandsubscribe", verifyAndSubscribe);

export default verifyRouter;
