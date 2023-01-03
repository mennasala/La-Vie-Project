const fs = require("fs");
const multer = require("multer");
const path = require("path");

// add image to profile
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const extention = path.extname(file.originalname);
    const newImageName = Date.now() + "test" + extention;
    cb(null, newImageName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("only.png, .jpj, .jpeg format allowed"));
    }
  },
});

module.exports = upload;
