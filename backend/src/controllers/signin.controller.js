import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils.js";

export default async function signin(req, res) {

    let { email, password } = req.body;

    console.log('headers', req.headers);
    console.log('body', req.body);

    try {

        let user = await User.findOne({email}, {createdAt: 0, updatedAt: 0})

        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                user.password = user.password.hidden;
                user = {
                    ...user._doc,
                    token: generateToken(user)
                }
                return res.send(user)
            }
        }

        res.status(401).send({
            message: "Invalid email or password"
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send({
            message: error.message
        })
    }

}