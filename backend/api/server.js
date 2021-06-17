import pkg from "mongodb";
const { MongoClient } = pkg;

//Atlas project key: ce6b5c10-5310-436a-82ef-76280b1fa0ea

const mongoUrl = "mongodb://localhost:27017/";
const remoteMongoUrl = "mongodb://localhost:27017/";
const client = new MongoClient(mongoUrl, { useUnifiedTopology: false });

var data = {
    stock: null
}

client.connect().then(a => {
    console.log("Connected succesfully to mongodb");
    var database = client.db("birreria");
    data.stock = database.collection("stock");
    data.ordenes = database.collection("ordenes");
});

export default data;