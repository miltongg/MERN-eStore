import Order from "../models/order.model.js";

export default async function createOrder(req, res) {

    const {
        orderItems, shippingAddress, paymentMethod, itemsPrice,
        shippingPrice, taxPrice, totalPrice
    } = req.body;

    try {

        const newOrder = new Order({
            orderItems: orderItems.map((item) => ({ ...item, product: item._id })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            user: req.user._id
        });

        const order = await newOrder.save();

        res.status(201).send({
            message: 'New order created',
            order
        })

    } catch (error) {
        console.log(error);
    }

}