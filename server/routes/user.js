const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getProfile,
    updateProfile
} = require("../controllers/user")
const auth = require("../middleware/authentication")

router.post("/register", register);
router.post("/login", login);
router.route("/profile").get(auth, getProfile).patch(auth, updateProfile);

module.exports = router;

