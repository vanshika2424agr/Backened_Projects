import connectDB from "./db/db.js";
import { app } from "./app.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });

  } catch (error) {
    console.log("MONGODB connection failed", error);
  }
};

startServer();
