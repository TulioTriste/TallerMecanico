import jwt from 'jsonwebtoken';
import { TOKEN_KEY_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorizedb' });
    }

    jwt.verify(token, TOKEN_KEY_SECRET, (err, decoded) => {
        console.log(decoded);
        if (err) {
            return res.status(401).json({ message: 'Unauthorizeda' });
        }

        req.user = decoded;

        next();
    });
}