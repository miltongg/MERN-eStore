import bcrypt from 'bcryptjs'

const data = {

    users: [

        {
            name: 'Milton',
            email: 'milton@mail.com',
            password: bcrypt.hashSync('1234'),
            isAdmin: true
        },
        {
            name: 'Miguel',
            email: 'miguel@mail.com',
            password: bcrypt.hashSync('1234'),
            isAdmin: false
        }

    ],

    products: [
        {
            name: 'Nike Slim Shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality shirt'
        },
        {
            name: 'Nike Fit Shirt',
            slug: 'nike-fit-shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 250,
            countStock: 20,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 10,
            description: 'High quality product'
        },
        {
            name: 'Nike Slim Pant',
            slug: 'nike-slim-pant',
            category: 'Pants',
            image: '/images/p3.jpg',
            price: 25,
            countStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product'
        },
        {
            name: 'Adidas Fit Pant',
            slug: 'adidas-fit-pant',
            category: 'Pants',
            image: '/images/p4.jpg',
            price: 65,
            countStock: 0,
            brand: 'Puma',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product'
        }
    
    ]
}

export default data;