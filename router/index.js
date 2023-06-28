const express = require('express');
const router = express.Router();
const homecontroler = require('../controller/home-controller');
const passport = require('passport');



router.get('/signin' , homecontroler.SignIN);
router.use('/student' , require('./student'));
// router.use('/company', require('./company'));
router.use('/company' , require('./company'));
router.get('/signup', homecontroler.Signup);
router.post('/create', homecontroler.create);
router.get('/destroy', homecontroler.destroyession);
router.get('/dowmload-csv', homecontroler.downloadCsv)


router.post('/createsession',
passport.authenticate(
   'local',
   {failureRedirect: '/signup'},
) ,
 homecontroler.createSession);

router.get('/',
passport.checkAuthentication, homecontroler.Home);

console.log('router load');
module.exports = router;