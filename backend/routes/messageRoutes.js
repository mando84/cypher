const express = require("express");
const router = express.Router();
const {
  getMessages,
  setMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMessages).post(protect, setMessage);
router.route("/:id").delete(protect, deleteMessage);

module.exports = router;
