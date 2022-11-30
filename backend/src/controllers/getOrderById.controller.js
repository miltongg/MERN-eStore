import Order from "../models/order.model.js";


export default async function getOrderById(req, res) {

    try {
        const order = await Order.findOne({_id: req.params.id});

        if (order) {
            res.send(order);
        } else {
            res.status(404).send({message: "Order not found"});
        }

    } catch (error) {
        console.log(error);
    }

}