const Joi = require('@hapi/joi');

const ClassTimetable = require('../models/ClassTimetable');
const Event = require('../models/Event');

// setting up class timetable. this is done by the course rep
exports.addEventToClassTimetable = async (req, res) => {
  const student = req.user.student;

  if (!student) {
    return res.status(400).json({
      status: 'fail',
      message: 'Must be logged in as student to add to class time table',
    });
  }
  // check if the user is the class rep
  if (!student.cRep) {
    return res.status(403).json({
      status: 'fail',
      message:
        'Unauthorized, must be a classrep to add an event to class time table',
    });
  }

  //validate user data
  const schema = Joi.object({
    programme: Joi.string().required(),
    eventName: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.string().required(),
    repeatDaily: Joi.boolean().optional(),
    repeatWeekly: Joi.boolean().optional(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  const event = await Event.create(req.body);

  //check if class does not already have a time table setup
  const cTable = await Classimetable.findOne({ programme: student.department });
  if (cTable) {
    //If class time table already exists, push the new event and save it
    cTable.events.push({ eventId: event._id });
    await cTable.save();

    res.status(200).json({
      status: 'success',
      data: {
        classTimetable: cTable,
      },
    });
  } else {
    //create a new class timetable and add the event
    const newCT = await ClassTimetable.create({
      programme: student.department,
      events: [{ eventId: event._id }],
    });
    res.status(200).json({
      status: 'success',
      data: {
        classTimetable: newCT,
      },
    });
  }
};

exports.getClassTimetable = async (req, res) => {
  //check if user is a student
  const student = req.user.student;

  if (!student) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Must be logged in as a student to view your personal time table',
    });
  }

  //get user class time table
  const cTable = await ClassTimetable.findOne({
    programme: student.department,
  }).populate('eventId');
  res.status(200).json({
    status: 'success',
    data: {
      classTimetable: cTable ? cTable : {},
    },
  });
};
// Deleting and updating an Event in the class timetable,Only done by the classRep
exports.deleteEventFromClassTimetable = async (req, res) => {
  const student = req.user.student;
  // Check if user is a student
  if (!student) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Must be logged in as student to delete an event in the class time table',
    });
  }

  // check if the user is the class rep
  if (!student.cRep) {
    return res.status(403).json({
      status: 'fail',
      message:
        'Unauthorized, must be a classrep to delete an event in class time table',
    });
  }
  // Get the class Timetable
  const classTimetable = await ClassTimetable.findOne({
    programme: student.department,
  });

  //get ID of event to be deleted
  const { eventId } = req.params;
  await Event.findOneAndDelete({ _id: eventId });

  //remove event ID and delete from classTimetable
  classTimetable.events = classTimetable.events.filter(
    (event) => event.eventId !== eventId
  );
  await classTimetable.save();

  res.status(200).json({
    status: 'success',
    message: 'Event removed successfully',
  });
};
