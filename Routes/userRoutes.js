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
});

function onlyWhenLoggedIn(req, res, next) {
    if (req.session && req.session.user) { 
        // Call next handler
        return next(); // Continue to the upload route
    }

    
    return res.redirect('/'); 
}

router.post('/upload', onlyWhnLoggedIn,upload.single('image'),fileController.upload_image);

module.exports = router;
