import multer from 'multer';
import path from 'path';
//set storagre
var storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, './src/uploads');
  // },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
