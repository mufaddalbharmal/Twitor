var express=require('express')
var router=express.Router()

var{login,homePage,signup}=require('../controllers/main')

var authentication=require('../middleware/authentication')

router.route('/home').get(authentication,homePage)
router.route('/login').post(login)
router.route('/signup').post(signup)

module.exports=router