import {model, Schema} from "mongoose";

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model('User', userSchema);