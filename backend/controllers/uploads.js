exports.postFile = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No file uploaded or file size exceeds limit!" });
  }

  // Successful upload
  res.status(200).json({
    message: "File uploaded successfully!",
    filePath: `/files/${req.file.filename}`, // Return public file URL
  });
};
