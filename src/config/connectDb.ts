/* eslint-disable no-console */
import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect(
    "mongodb+srv://fahad:fahad123@cluster0.2ylfh4t.mongodb.net/?retryWrites=true&w=majority",
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("mongo db connected..!");
      }
    }
  );
};
