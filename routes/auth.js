const router = require('express').Router();
const User = require('../model/User');
const {registerValidation} = require('../validation')


router.post('/register',async (req,res) =>{

    //Validate an user before submitting
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)


    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        date : req.body.date
    })

    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;