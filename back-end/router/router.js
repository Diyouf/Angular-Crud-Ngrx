const express = require('express')
const UserController = require('../user/userController')
const adminController = require ('../admin/adminController')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });


router.route('/register').post(UserController.createUser)
router.route('/login').post(UserController.loginUser)
router.route('/admin').get(adminController.getUser)
router.route('/admin/admin-login').post(adminController.loginAdmin)
router.route('/userDelete').delete(adminController.deleteUser)
router.route('/userData').get(UserController.getUser)
router.route('/admin/add-user').post(adminController.addUser)
router.route('/admin/EditUser').post(adminController.editUser)
router.route('/userImage').post(upload.single('image'),UserController.uploadImage)


module.exports = router
