const express = require("express");
const uploadsController = require("../controllers/uploads");
const multer = require("multer");

// Multer configuration
const uploadDir = require("path").join(__dirname, "../files");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Save in "files" directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

const router = express.Router();

// POST route for file upload
router.post("/", upload.single("file"), uploadsController.postFile);

module.exports = router;
