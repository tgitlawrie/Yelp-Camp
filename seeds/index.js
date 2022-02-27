const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '6211adc16fef3a747bd8cef7',  // delete this later
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa voluptates minima ex corrupti consequuntur! Qui tempore dolores vel sed quod quae. Omnis modi provident repudiandae repellendus incidunt earum, numquam dolorum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dutpkbicz/image/upload/v1645510108/YelpCamp/ga8golsfqlagchqgyppf.jpg',
                    filename: 'YelpCamp/ga8golsfqlagchqgyppf'
                },
                {
                    url: 'https://res.cloudinary.com/dutpkbicz/image/upload/v1645510110/YelpCamp/v8kgchmml0ztu3amaggx.jpg',
                    filename: 'YelpCamp/v8kgchmml0ztu3amaggx'
                },
                {
                    url: 'https://res.cloudinary.com/dutpkbicz/image/upload/v1645510112/YelpCamp/mqo6qkczrafwiefwwbop.jpg',
                    filename: 'YelpCamp/mqo6qkczrafwiefwwbop'
                }
            ]

        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})