import jwt from "jsonwebtoken";

export const generateToken = (user) => {

    return jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

};

export const isAuth = (req, res, next) => {

    const authorization = req.headers.authorization;

    if (authorization) {
        const token = authorization

        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error) {
                res.status(401).send({ message: 'Invalid Token' })
            } else {
                req.user = decode.user;
                next();
            }
        })
    } else {
        res.status(401).send({ message: 'No Token' })
    }
}