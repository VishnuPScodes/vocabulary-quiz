import express from "express";
import cron from "cron";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});
