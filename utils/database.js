import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "orbangroove",
    });
    isConnected = true;
    console.log("connected");
  } catch (err) {
    console.log("error conecting to mongo");
  }
};
