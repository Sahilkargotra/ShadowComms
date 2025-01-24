import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}
const MONGODB_URI = "mongodb+srv://kargotrasahil:IdWCTMQfyNsU5WbO@shadowcomms.ucobg.mongodb.net/";
const connection : ConnectionObject = {}

async function dbConnect() : Promise<void> {

if(connection.isConnected)
{
    console.log("DataBase Connected Already");
    return
}
try {
     const db = await mongoose.connect(MONGODB_URI || '',{})
      connection.isConnected = db.connections[0].readyState
      console.log("DB connected Successfully");

} catch (error) {
    console.log("DataBase connection failed",error);
    process.exit(1);
}}

export default dbConnect;