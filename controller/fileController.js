const File = require('../models/file');


const upload_image = async (req,res)=>{
    try{
        if(!req.file){
            return  res.status(400).send('No file uploaded');
        }

        const new_file = new File({
            filename: req.file.originalname,
            data:req.file.buffer,
            mimetype:req.file.mimetype,
            size:req.file.size,
        });

        await new_file.save();
        console.log("File uploaded successfully");
        res.render('index');
    }catch(err){
        console.log(err);
        res.status(500).send("Error inserting image into databse");
    }
}


module.exports = {upload_image};
