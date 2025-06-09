const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware to handle multiple files
// const uploadMultiple = upload.fields([
//   { name: "cv", maxCount: 1 },
//   { name: "profilePic", maxCount: 1 }
// ]);

// module.exports = uploadMultiple;
module.exports = upload;