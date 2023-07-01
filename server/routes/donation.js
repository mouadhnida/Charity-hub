const express = require("express");
const router = express.Router();

const {addDonation, getDonation} = require("../controllers/donation");

const auth = require("../middleware/authentication")

router.post("/", auth, addDonation);
router.get("/:id", auth, getDonation);

module.exports = router;
