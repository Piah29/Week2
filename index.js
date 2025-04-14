const { MongoClient } = require('mongodb');

// Initial driver data
const carDrivers = [
    {
        name: "John Doe",
        vehicleType: "Sedan",
        isAvailable: true,
        rating: 4.9
    },
    {
        name: "Alice Smith",
        vehicleType: "SUV",
        isAvailable: false,
        rating: 4.4
    }
];

// Display initial drivers
console.log("Initial Drivers:");
console.table(carDrivers);

// Add new driver
const newDriver = {
    name: "Syazwan Haziq",
    vehicleType: "Convertible",
    isAvailable: true,
    rating: 4.1
};
carDrivers.push(newDriver);

console.log("\nAfter Adding New Driver:");
console.table(carDrivers);

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        console.time("Connection Time");
        await client.connect();
        console.timeEnd("Connection Time");
        console.log("Connected to MongoDB successfully!");

        const db = client.db("testDB");
        const carDriverCollection = db.collection("carDrivers");

        // Clear existing data
        await carDriverCollection.deleteMany({});
        console.log("Cleared existing driver data");

        // Insert all drivers
        const insertResult = await carDriverCollection.insertMany(carDrivers);
        console.log(`Inserted ${insertResult.insertedCount} drivers`);

        // Display all drivers from database
        const allDrivers = await carDriverCollection.find({}).toArray();
        console.log("\nDrivers in Database:");
        console.table(allDrivers);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("\nDisconnected from MongoDB");
    }
}

// Execute the main function
main().catch(console.error);
