const User = require('../models/user');
const bcrypt = require('bcrypt');

const save_user = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send('User already exist');
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const new_user = new User({
            email,
            password:hashedPassword
        })

    await new_user.save();
    
    console.log('User saved successfully');
    res.render('index');
        
    }catch (error) {
        console.log(error);
        res.status(500).send('Error registering user');
    }
}


const find_user = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send('Invalid email or passowrd');
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).send('Invalid email or password');
        }

        console.log("User found");
        res.render('index');
    }catch(error){
        console.log(error)
        res.status(500).send('Error logging in');
    }
}





module.exports = {
    find_user,
    save_user
    
}