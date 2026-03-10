import crypto from 'crypto'
import { collection } from '../models/collection.model.js';
import dotenv from 'dotenv'
import { Request, Response } from 'express';
import config from '../config.js';
import { hashPassword } from '../utils/password.utils.js';
dotenv.config()

const generateReferralCode = (email: string) => {
  const secret = config.REFERRAL_SECRET || 'your-secure-secret-key';
  const hash = crypto
    .createHmac('sha256', secret)
    .update(email)
    .digest('hex');

  return hash.substring(0, 8).toUpperCase(); // Return first 8 characters in uppercase
};

const authsignupaction = async (req: Request, res: Response) => {
  let message = "";
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }
  const data = new collection(req.body);
  data.refercode = generateReferralCode(data.email)
  data.isvalid = 1
  data.usenumber = 5
  const mail = await collection.find({ email: req.body.email });
  if (mail.length == 0) {
    await data.save();
    res.status(200).send("OK");
  } else {
    res.status(400).send("Not OK");
  }
};

export { authsignupaction };
