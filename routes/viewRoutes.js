const express = require("express");
const router = express.Router();
const viewsController = require("./../controllers/viewController");

router.get("/", viewsController.getWallet); 
router.get("/scanner", viewsController.getVerifier);

module.exports = router;
