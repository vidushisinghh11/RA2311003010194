import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const TOKEN = process.env.ACCESS_TOKEN!;

app.get("/notifications", async (_, res) => {
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications?limit=10&page=1",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    res.json(response.data);
  } catch (err: any) {
    console.log("ERROR =", err.response?.data || err.message);
    res.status(500).json(err.response?.data || err.message);
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});