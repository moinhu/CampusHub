const studentService = require('../services/student.service');

async function todaysEvents(req, res, next) {
  try {
    const events = await studentService.getTodaysEvents();
    res.json({ events });
  } catch (err) {
    next(err);
  }
}

async function myRegistrations(req, res, next) {
  try {
    const userId = req.user.id;
    const events = await studentService.getMyRegisteredEvents(userId);
    res.json({ events });
  } catch (err) {
    next(err);
  }
}

async function upcomingEvents(req, res, next) {
  try {
    const events = await studentService.getUpcomingEvents();
    res.json({ events });
  } catch (err) {
    next(err);
  }
}

async function pastEvents(req, res, next) {
  try {
    const userId = req.user.id;
    const events = await studentService.getPastEvents(userId);
    res.json({ events });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  todaysEvents,
  myRegistrations,
  upcomingEvents,
  pastEvents
};
