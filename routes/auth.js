const router = require('express').Router();
const User = require('../model/User');
const {registerValidation} = require('../validation')
const bcrypt = require('bcryptjs');


router.post('/register', async (req,res) =>{

    //Validate an user before submitting
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Checking for same user if present
    const emailExist = await User.findOne({email : req.body.email})
    if(emailExist){
        return res.status(400).send("Email already exists")
    }
    

    // //Hashing of the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)



    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    })

    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;