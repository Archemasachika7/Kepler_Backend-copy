import { collection } from "../models/collection.model.js";
const allusers = async () => {
    const userdata = await collection.find();
    return userdata;
};
export default allusers;
