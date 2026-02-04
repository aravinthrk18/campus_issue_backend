const Issue = require("../models/issues");

// STUDENT: create issue (with optional image)
exports.createIssue = async (req, res) => {
  try {
    const { title, description } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    }

    const issue = await Issue.create({
      title,
      description,
      image: imageUrl,
      createdBy: req.user.id,
    });

    res.status(201).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// STUDENT: see only own issues
exports.getMyIssues = async (req, res) => {
  const issues = await Issue.find({ createdBy: req.user.id });
  res.json(issues);
};

// ADMIN: see all issues
exports.getAllIssues = async (req, res) => {
  const issues = await Issue.find().populate("createdBy", "name email");
  res.json(issues);
};
// ADMIN: update issue status
exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // validate status
    if (!["open", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
