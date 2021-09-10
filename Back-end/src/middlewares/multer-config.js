const multer = require('multer');

// creates all MIME TYPES to define images formats
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// configures where and under what name the image should be stored
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {                        //generates a new name for the file if needed by removing whitespaces and replacing them by underscores
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// exports the module and specifies the storage coupled with the single methods that tells that the file is a unique image
module.exports = multer({storage: storage}).single('image');