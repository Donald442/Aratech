const passport = require('passport');

const router = require('express').Router();
const authController = require('../controllers/authController');

const uploadMiddleware = require('../utils/upload');

//@POST
//sign up user
router.post('/students/register', authController.studentSignup);
router.post('/lecturers/register', authController.lecturerSignup);

//Login
router.post('/students/login', authController.studentSignin);
router.post('/lecturers/login', authController.lecturerSignin);

//verify email
router.post('/verifyemail', authController.verifyEmail);

//forgot password
router.post('/forgotpassword', authController.forgotPassword);

//reset password
router.post('/resetpassword', authController.resetPassword);

//set user profile picture
router.post(
  '/avatar',
  passport.authenticate('jwt', { session: false }),
  uploadMiddleware.single('avatar'),
  authController.setProfilePic
);

//resend email confirmation link
router.post(
  '/resendemailverify',
  passport.authenticate('jwt', { session: false }),
  authController.resendVerificationEmail
);

//add course for lecturer
router.post(
  '/addcourse',
  passport.authenticate('jwt', { session: false }),
  authController.addCourseForLecturer
);

//chang user password
router.put(
  '/updatepassword',
  passport.authenticate('jwt', { session: false }),
  authController.changeUserPassword
);

//get current user route
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  authController.me
);

router.delete(
  '/student/profile',
  passport.authenticate('jwt', { session: false }),
  authController.deleteStudentAccount
);

router.delete(
  '/lecturer/profile',
  passport.authenticate('jwt', { session: false }),
  authController.deleteLecturerAccount
);

module.exports = router;
