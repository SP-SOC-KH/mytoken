const path = require("path");
const AppError = require("../utils/appError");

//HOME PAGE
exports.getWallet = (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "index.html"));
};

exports.getVerifier = (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "verifier.html"));
};
