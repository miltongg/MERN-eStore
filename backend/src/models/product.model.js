import {model, Schema} from "mongoose";

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    numReviews: {
        type: Number,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);