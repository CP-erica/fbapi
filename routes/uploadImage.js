const multer = require('multer');
const path = require('path');
const express = require('express')

var storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        let img = file.originalname.split('.').slice(0, -1).join('.');
        let imgname = img + "-" + Date.now() + ext;

        callback(null, imgname);
    }
});

var imageFileFilter = (req, file, callback ) => {
    if(!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)){
        return callback(newError("Only image file uploaded",false));
    }
    callback(null,true);
};

var upload= multer({
    storage: storage,
    fiileFilter: imageFileFilter,
    limits: {fileSize: 10000000000000 }
});

const router = new express.Router();
//upload image
router.post('/upload', upload.single('image'),(req,res)=>{
    res.json(req.file);
});

module.exports = upload;
module.exports = router;