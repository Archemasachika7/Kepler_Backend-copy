import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../index.js';
const checkAccessToken = async (req, res, next) => {
    try {
        const fullAccessToken = req.headers['authorizationaccesstoken'];
        if (!fullAccessToken) {
            res.status(401).json({
                message: "Authorisation token missing",
            });
            return;
        }
        const token = fullAccessToken.toString().split(' ')[1];
        const decode = jwt.verify(token, JWT_ACCESS_SECRET ?? "");
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).send("Access Token Expired");
    }
};
export default checkAccessToken;
