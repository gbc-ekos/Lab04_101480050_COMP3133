import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import {User} from "./models/User.js";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const app = express();
app.use(express.json());

app.get("/users", (req, res) => {
    User.find().then((users) => {
        res.json(users);
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});

app.post("/users", async (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
