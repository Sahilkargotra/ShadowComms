import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}
// const MONGODB_URI = process.env.MONGODB_URI as string;
// if(!MONGODB_URI)
// {
//     throw new Error("MONGODB_URI is not defined in the environment variables");
// }
const connection : ConnectionObject = {}

async function dbConnect() : Promise<void> {

if(connection.isConnected)
{
    console.log("DataBase Connected Already");
    return
}
try {
    const MONGODB_URI = "mongodb+srv://kargotrasahil:IdWCTMQfyNsU5WbO@shadowcomms.ucobg.mongodb.net/"
     const db = await mongoose.connect(MONGODB_URI ||'',{});
     
      connection.isConnected = db.connections[0].readyState;
      console.log("Database connected Successfully");

} catch (error) {
    console.log("DataBase connection failed",error);
    process.exit(1);
}}

export default dbConnect;