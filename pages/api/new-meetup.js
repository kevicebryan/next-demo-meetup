// api/new-meetup
import { MongoClient } from "mongodb";
const MONGO_URL =
  "mongodb+srv://kevice:kevinbryan@cluster0.zkzm3ef.mongodb.net/meetups?retryWrites=true&w=majority";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      const client = await MongoClient.connect(MONGO_URL);
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const result = await meetupsCollection.insertOne(data);
      console.log(result);
      client.close();

      res.status(201).json({ message: "Meetup inserted!" });
    } catch (error) {
      console.log(error.mesage);
    }
  }
}

export default handler;
