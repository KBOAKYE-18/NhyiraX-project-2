const express = require ('express');
const mongoose = require('mongoose');
const multer = require('multer');
const userRoutes = require ('./routes/userRoutes');
const session = require('express-session');


const app  = express();

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false
  })
);

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
    secret:"some secret key",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*1
    }
}))

const dbURI = "mongodb+srv://user_kb:test1234@cluster0.9awrg0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("DB connection error:", err));




app.listen(3000,()=>{
    console.log('Server is running');
});

app.use((err,req,res,next)=>{
    if(err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE'){
        return res.status(400).send('File too large! Maximum allowed size is 500kb');
    }

    next(err);
})

app.use('/',userRoutes);






