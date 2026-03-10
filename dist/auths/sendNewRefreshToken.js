import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../index.js';
const createNewAccessToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    try {
        const decode = jwt.verify(refreshToken, JWT_REFRESH_SECRET ?? "");
        const email = decode.email;
        const accessToken = jwt.sign({
            type: "Access",
            email: email,
        }, JWT_ACCESS_SECRET ?? "", {
            expiresIn: '1h'
        });
        res.status(200).json({
            message: 'OK',
            accessToken: accessToken,
        });
    }
    catch (err) {
        res.status(403).json({
            message: "Refresh token expired"
        });
    }
};
export default createNewAccessToken;
