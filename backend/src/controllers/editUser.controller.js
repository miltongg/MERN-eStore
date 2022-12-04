import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils.js";

export default async function editUser(req, res) {

    try {

        const { name, email, password } = req.body;
        const user = await User.findOne({_id: req.user._id});

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            if (password) {
                user.password = bcrypt.hashSync(password, 10);
            }

            let updatedUser = await user.save();

            updatedUser = {
                ...updatedUser._doc,
                token: generateToken(user)
            }


            res.send(updatedUser)
        } else {
            res.status(404).send({message: 'User not found'});
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({message: error.message});
    }

}