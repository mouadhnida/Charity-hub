const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile,
    removeProfile,
    getOrganizations,
    getFeedbacks,
    addFeedback,
    removeFeedback
} = require("../controllers/organizations")
const auth = require("../middleware/authentication")

router.get("/", getOrganizations);
router.post("/register", register);
router.post("/login", login);
router.route("/:id")
  .get(getProfile)
  .patch(auth, updateProfile)
  .delete(auth, removeProfile);
router.route("/:id/feedback").get(getFeedbacks).post(auth, addFeedback);
router.delete("/:id/feedback/:feedbackId", auth, removeFeedback);

module.exports = router;