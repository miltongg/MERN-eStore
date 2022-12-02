import Order from "../models/order.model.js";

export default async function(req, res) {

    const orders = await Order.find({user: req.user._id})

    res.send(orders);

}