const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'upload/');
    },

    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random () * 1E9);
        
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});


const fileFilter = (req, file, cb) =>{

    const allowedTypes = /jpeg|jpg|png|webp/;

const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
const mime = allowedTypes.test(file.mimetype);

if(ext && mime){

    cb(null, true);

}else{

    cb(new Error('Only Images are allowed(jpeg, jpg, png, webp'))
}

};


const upload = multer({

    storage, 
    limits: {fullSize: 5 * 1024 * 1024},

    fileFilter
});

module.exports = upload;



