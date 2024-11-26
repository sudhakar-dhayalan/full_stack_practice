
const path = require("path");
const fs = require("fs");
const multer = require("multer");
// const Product = require('../models/uploads');

exports.getAddProduct = (req, res, next) => {
  // res.render('admin/edit-test', {
  //   pageTitle: 'Add test',
  //   path: '/admin/add-test',
  //   editing: false,
  // });
};


// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "../files");
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


exports.postFile = (upload.single("file"), (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or file size exceeds limit!" });
    }
  
    res.status(200).json({
      message: "File uploaded successfully!",
      filePath: `../files/${req.file.filename}`,
    });
  
  // const upload = new Upload({
  //   title,
  //   price,
  //   description,
  // });
  // upload
  //   .save()
  //   .then((result) => {
  //     console.log('Stored File');
  //     res.redirect('/');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});