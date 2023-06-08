const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        const userEmail = await User.findOne({ email: email })
        if (userEmail.isAdmin === true) {
            if (userEmail) {
                const checkPassword = await bcrypt.compare(password, userEmail.password)
                if (!checkPassword) {
                    res.json({ Passmessage: "Password is incorrect" })
                } else {
                    const jwtToken = jwt.sign(req.body, "AdminsecretKey")
                    res.json({ success: true, jwtToken, userName: userEmail.name })
                }
            } else {
                res.json({ Emailmessage: "Email is not valid" })
            }
        } else {
            res.json({ Adminmessage: "You are not admin" })
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getUser = async(req,res)=>{
    try {
       const userData = await User.find({isAdmin:false})
       if(userData){
        res.json({userData})
       }
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async(req,res)=>{
    try {
        const id = req.query.id
        const deleteWorks = await User.deleteOne({_id:id})
        if (deleteWorks){
            res.json({message:true})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const addUser = async(req,res)=>{
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
    }catch (error){
        console.log(error.message);
    }
}

const editUser = async (req,res)=>{
    try {
       const {name,email} = req.body
       const userData = await User.findOneAndUpdate({email:email},{$set:{name:name,email:email}})
       if(userData){
        res.json({success:true})
       }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loginAdmin,
    getUser,
    deleteUser,
    addUser,
    editUser
}