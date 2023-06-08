const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const checkEmail = await User.findOne({ email: email })

        const user = new User({
            name,
            email,
            password: hashPassword
        })
        if (checkEmail) {
            return res.json({ message: "Email is already Exists" })
        } else {
            await user.save()
            res.json({ success: true })
        }
    } catch (error) {
        console.log(error.message);
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userEmail = await User.findOne({ email: email })
        if (userEmail) {
            const checkPassword = await bcrypt.compare(password, userEmail.password)
            if (!checkPassword) {
                res.json({ Passmessage: "Password is incorrect" })
            } else {
                const jwtToken = jwt.sign(req.body, "UsersecretKey")
                res.json({ success: true, jwtToken,id:userEmail._id })
            }
        } else {
            res.json({ Emailmessage: "Email is not valid" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getUser = async(req,res)=>{
    try {
       const userData = await User.findOne({_id:req.query.id},{_id:0,name:1,email:1,image:1})
       res.json({userData})
    } catch (error) {
        console.log(error.message);
    }
}

const uploadImage = async(req,res)=>{
    try {
        console.log(req.body);
        console.log(req.file);
        const uploadImage = await User.findByIdAndUpdate({_id:req.query.id},{$set:{image:req.file.filename}})
        if(uploadImage){
            res.json({hai:true})
        }

    } catch (error) {
        console.log(error.nessage);
    }
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    uploadImage
}