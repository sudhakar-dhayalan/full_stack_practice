const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const port = 3000;

const uploadsRoute = require('./routes/uploads');

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "/files");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Use absolute path for the "uploads" directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Rename file with a timestamp
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No file uploaded or file size exceeds limit!" });
  }

  res.status(200).json({
    message: "File uploaded successfully!",
    filePath: `/files/${req.file.filename}`,
  });
});

// Todo
// app.use('/upload', uploadsRoute);

// Serve uploaded files
app.use("/files", express.static(uploadDir));

// Sample API
app.get("/api/data", (req, res) => {
  res.json({ message: "success" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
