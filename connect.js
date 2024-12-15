const { MongoClient } = require('mongodb');

// Replace <username>, <password>, and <dbname> with your MongoDB Atlas details
const uri = 'mongodb+srv://psakh:NIMPHIUS!1958@clusterforcsc.0885f.mongodb.net/?retryWrites=true&w=majority&appName=ClusterForCSC&tlsAllowInvalidCertificates=true';

// Function to connect to MongoDB
async function connectDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to MongoDB Atlas!');

    // Perform database operations (optional)
    const db = client.db('databaseForCSC');
    const collection = db.collection('test');
    const data = await collection.find().toArray();
    console.log('Data from test collection:', data);

    // Return the database instance for further use
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  } finally {
    // Close the client when done
    await client.close();
  }
}

module.exports = connectDB;