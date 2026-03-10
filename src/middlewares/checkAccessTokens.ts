import jwt from 'jsonwebtoken'
import { JWT_ACCESS_SECRET } from '../index.js'
import { NextFunction, Request, Response } from 'express';

const checkAccessToken = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const fullAccessToken = req.headers['authorizationaccesstoken'];
        if(!fullAccessToken){
            res.status(400).json({
                message: "Authorisation token missing",
            })
            return;
        }
        const token = fullAccessToken.toString().split(' ')[1];
        const decode = jwt.verify(token, JWT_ACCESS_SECRET);
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).send("Access Token Expired");
    }
}
export default checkAccessToken