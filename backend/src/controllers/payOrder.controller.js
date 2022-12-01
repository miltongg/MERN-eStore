import Order from "../models/order.model.js";

export default async function payOrder(req, res) {

    const { id, update_time, email_address } = req.body;

    try {

        const order = await Order.findOne({_id: req.params.id});

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.update_time,
                email_address: req.body.email_address
            };

            const updatedOrder = await order.save();
            res.send({
                message: 'Order paid',
                order: updatedOrder
            });
        } else {
            res.send(404).send({ message: 'Order not found' })
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).send({ message: error.message })
    }

}