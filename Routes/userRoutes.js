const userController = require('../controller/userController');
const fileController = require('../controller/fileController');
const multer = require('multer');
const express = require ('express');
const router = express.Router();

const storage =multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits:{filesize:500 * 1024}
});

router.post('/create-account',userController.save_user);
router.post('/login',userController.find_user);

router.get('/',(req,res)=>{
    res.render('login');
});
router.get('/signup',(req,res)=>{
    res.render('signup');
})

router.post('/upload',upload.single('image'),fileController.upload_image);

module.exports = router;