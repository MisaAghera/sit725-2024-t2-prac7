const { MongoClient } = require('mongodb');

// MongoDB connection URI and Database Name
const uri = 'mongodb+srv://s223000802:aIKUfpEXiAptMNMr@cluster0.janjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const dbName = 'Cars';
let db;
let database;

// Connect to MongoDB and initialize the database connection
async function connectDB() {
    if (!db) {
        try {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            db = client.db(dbName);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
    return db;
}


//Function to get all cars from the database
const getAllCars = async () => {
    const database = await connectDB();
    const collection = database.collection('cars');
    const cars = await collection.find({}).toArray();  
    return cars;
}

// Function to insert a car into the database
const addCar = async (carData) => {
    const database = await connectDB();
    const collection = database.collection('cars');  
    const result = await collection.insertOne(carData);  
    return !!result;
}

module.exports = {
    addCar,
    getAllCars
};
