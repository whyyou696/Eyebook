const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    const database = client.db('gc01');
    const users = database.collection('users');
    const user = await users.find().toArray();
    console.log(user);
  } finally {
    await client.close();
  }
}

module.exports = connect;