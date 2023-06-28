const express = require('express');
const router = express.Router();
const Studentcontroller = require('../controller/student-controller');
const passport = require('passport');

router.get('/studentprofile', Studentcontroller.Studentpage);
router.post('/studentcrate', Studentcontroller.Studentcreate);
router.get('/delete/:id', passport.checkAuthentication, Studentcontroller.deleteStudent);
module.exports = router;