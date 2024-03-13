
const express = require("express");
const bodyParser = require("body-parser");

// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });
const viewRouter = require("./routes/viewRoutes");
const cookieParser = require("cookie-parser")
var cors = require('cors');

const app = express();
const path = require("path");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json()); //allow the express to process json
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", viewRouter);
app.use(express.static(path.join(__dirname, "views")));

module.exports = app;
