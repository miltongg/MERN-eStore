import Product from "../models/product.model.js";

const PAGE_SIZE = 3;

export default async function searchProduct(req, res) {

    try {

        const { query } = req
        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const category = query.category || '';
        const brand = query.brand || '';
        const price = query.price || '';
        const rating = query.rating || '';
        const order = query.order || '';
        const searchQuery = query.query || '';

        const queryFilter = searchQuery && searchQuery !== 'all' ?
            {
                name: {
                    $regex: searchQuery,
                    $option: 'i'
                }
            } : {};

        const categoryFilter = category && category !== 'all' ? { category } : {};
        const ratingFilter = rating && rating !== 'all' ?
            {
                rating: {
                    $gte: Number(rating)
                }
            } : {};
        const priceFilter = price && price !== 'all' ?
            { // 1-50
                price: {
                    $gte: Number(price.split('-')[0]),
                    $lte: Number(price.split('-')[1])
                }
            } : {};

        const sortOrder =
            order === 'featured' ?
                {featured: - 1} :
                order === 'lowest' ?
                    {price: 1} :
                    order === 'highest' ?
                        {price: - 1} :
                        order === 'toprated' ?
                            {rating: - 1} :
                            order === 'newest' ?
                                {createdAt: - 1} :
                                { _id: -1 };

        const products = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter
        })
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter
        });

        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize)
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({message: error.message});
    }

}