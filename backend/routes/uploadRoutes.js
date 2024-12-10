import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Configure multer storage settings
const storage = multer.diskStorage({
  // Define where the uploaded files should be stored
  destination(req, file, cb) {
    cb(null, "uploads/"); // Files will be stored in the 'uploads' directory
  },

  // Define the filename for the uploaded file
  filename(req, file, cb) {
    // Format the filename as fieldname-Timestamp.extension (e.g., image-1633700000000.jpg)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File validation function
function fileFilter(req, file, cb) {
  // Define allowed file types (JPEG, PNG, WebP)
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  // Check if file's extension and MIME type match allowed types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    // Allow the file if it's a valid image type
    return cb(null, true);
  } else {
    // Reject the file with an error message if it's not a valid image
    return cb(new Error("Images only!"));
  }
}

// Configure multer to use the storage and file filter settings
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Limit file size to 5 MB
});

// Middleware to handle single image uploads
const uploadSingleImage = upload.single("image"); // 'image' is the field name for the uploaded file

// Define the route for uploading images
router.post("/", (req, res) => {
  // Handle the image upload
  uploadSingleImage(req, res, function (err) {
    if (err) {
      // If there's an error (e.g., invalid file), send a 400 response
      return res.status(400).send({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    // If successful, send a 200 response with the image path
    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`, // Return the file path for the uploaded image
    });
  });
});

export default router;
