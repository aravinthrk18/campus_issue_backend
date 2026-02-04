const express = require("express");
const router = express.Router();


const { protect, restrictTo } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadmiddleware");
const {
  createIssue,
  getMyIssues,
  getAllIssues,
  updateIssueStatus,
} = require("../controllers/issueController");


// student
router.post(
  "/",
  protect,
  restrictTo("student"),
  upload.single("image"),
  createIssue
);

router.get("/my", protect, restrictTo("student"), getMyIssues);

// admin
router.get("/", protect, restrictTo("admin"), getAllIssues);

module.exports = router;
// admin: update issue status
router.patch(
  "/:id/status",
  protect,
  restrictTo("admin"),
  updateIssueStatus
);
