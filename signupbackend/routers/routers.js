const express =  require('express')
const router = express.Router()
const signupTemplateCopy =  require('../models/signupmodels')
const bcrypt = require('bcrypt')

router.post('/signup', async (req,res) => {
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)
    
    const signedupUser = new signupTemplateCopy({
        fullName:req.body.fullName,
        username:req.body.username,
        email:req.body.email,
        password:securePassword
    })
    signedupUser.save()
    .then(data =>{
        res.json(data)
    })
    .catch(error => {
        res.json(error)
    })
})

module.exports = router