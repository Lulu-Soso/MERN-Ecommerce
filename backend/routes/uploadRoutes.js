import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

// router.post('/', (req, res) => {
//   uploadSingleImage(req, res, function (err) {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     }

//     res.status(200).send({
//       message: 'Image uploaded successfully',
//       image: `/${req.file.path}`,
//     });
//   });
// });

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    // Assuming your base URL for serving images is "http://localhost:3000/uploads/"
    const baseUrl = "http://localhost:3000/uploads/";
    // const baseUrl = process.env.REACT_APP_UPLOADS_URL || "http://localhost:3000/uploads/";

    // Construct the absolute URL of the uploaded image
    const absoluteImageUrl = baseUrl + req.file.filename;

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: absoluteImageUrl, // Send the absolute URL to your React frontend
    });
  });
});

export default router;