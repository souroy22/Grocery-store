require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./database/dbConnect");
const allRouters = require("./routers");

const server = express();
const PORT = process.env.PORT || 5000;

// connecting to database
database();

server.use(cors());
server.use(express.json());
server.use(cookieParser());

server.use("/api", allRouters);

server.listen(PORT, (error) => {
  if (error) {
    console.log(`Error while running server, error -> ${error.message}`);
    return;
  }
  console.log(`Server is running on PORT: ${PORT}`);
});
