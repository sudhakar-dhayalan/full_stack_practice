const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const uploadsRoute = require('./routes/uploads');

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Upload Route
app.use('/upload', uploadsRoute);

// Serve uploaded files (Static)
app.use("/files", express.static('files'));


app.get("/api/data", (req, res) => {
  res.json({ message: "success" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
