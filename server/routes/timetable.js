const router = require('express').Router();
const passport = require('passport');

const personalTimetableController = require('../controllers/personalTimetableController');
const classTimetableController = require('../controllers/classTimetableController');

//get student user personal timetable
router.get(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.getPersonalTimetable
);
//get class timetable
router.get(
  '/class',
  passport.authenticate('jwt', { session: false }),
  classTimetableController.getClassTimetable
);

//add a new event to personal timetable
router.post(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.addEventToPersonalTimetable
);
//add a new event to class timetable
router.post(
  '/class',
  passport.authenticate('jwt', { session: false }),
  classTimetableController.addEventToClassTimetable
);

//delete event in personal time table
router.delete(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.deleteEventFromPeronsalTable
);
// delete event in Class Timetable
router.delete(
  '/class',
  passport.authenticate('jwt', { session: false }),
  classTimetableController.deleteEventFromClassTimetable
);
module.exports = router;
