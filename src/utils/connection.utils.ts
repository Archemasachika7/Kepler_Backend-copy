import mongoose from "mongoose";
import config from "../config.js";
import logger from "./winston_logger.js";

const server = config.SERVER;
const database = config.DATABASE;
(async () => {
    try {
      await mongoose.connect(`mongodb+srv://${server}/${database}`);
      logger.info('Database Successfully Connected')
      console.log("Connecion Successful");
    } catch (err) {
      console.log(err);
      logger.info('Database error ' + err)
    }
})();