const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const TEMP_DIR = path.join(__dirname, '..', 'temp');

const storage = multer.diskStorage({
    destination: TEMP_DIR,
    filename: (req, file, cb) => {
        const [ filename, extension ] = file.originalname.split('.');
        cb(null, `${filename}(${uuidv4()}).${extension}`);
    },
});

const upload = multer({
    storage
});

module.exports = upload;