// const mongoose = require("mongoose");
const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });
const app = require("./app");

// const DB = process.env.DATABASE.replace(
//   "PASSWORD",
//   process.env.DATABASE_PASSWORD
// );

// const local_DB = process.env.DATABASE_LOCAL;

// mongoose
//   .connect(DB) //.connect(DB)
//   .then((con) => {
//     // console.log(con.connections);
//     console.log("DB connection successful");
//   })
//   .catch((error) => console.log(error));

//starting the server on port 4001
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is running on port ${port} ...`);
});
