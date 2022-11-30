import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import {generateToken} from "../utils.js";

export default async function signup(req, res) {

    const { name, email, password } = req.body;

    console.log('headers', req.headers);
    console.log('body', req.body);

    try {

        const newUser = new User({
            name,
            email,
            password: bcrypt.hashSync(password)
        })

        let user = await newUser.save();

        user = {
            ...user._doc,
            token: generateToken(user)
        }

        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message
        })

    }

}