import dotenv from "dotenv";
dotenv.config();

import app from "./express.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { v7 as uuidv7 } from "uuid";
import { database } from "./models/database.js";
import http from "http";
import { Server } from "socket.io";

// Connection URL
if (process.env.ENVIRONMENT == "sandbox") {
  await database(process.env.DEV_DATABASE_URL);
}

if (process.env.ENVIRONMENT == "test") {
  await database(process.env.TEST_DATABASE_URL);
}

process.env.JWT_SECRET = uuidv4();

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", process.env.PORT);
});
const server = http.createServer(app);
const io = new Server(server);
