import multer from 'multer';
import { nanoid } from 'nanoid';

//set storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
    cb(null, file.fieldname + '-' + nanoid() + ext);
  },
});

export default multer({ storage });
