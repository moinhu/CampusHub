const dashboard = require('../services/clubDashboard.service');

async function myEvents(req, res, next) {
  try {
    const userId = req.user.id;
    const events = await dashboard.getMyClubEvents(userId);
    res.json({ events });
  } catch (err) {
    next(err);
  }
}

async function registrations(req, res, next) {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    const list = await dashboard.getEventRegistrations(eventId, userId);
    res.json({ registrations: list });
  } catch (err) {
    next(err);
  }
}

async function attendance(req, res, next) {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    const list = await dashboard.getEventAttendance(eventId, userId);
    res.json({ attendance: list });
  } catch (err) {
    next(err);
  }
}

async function analytics(req, res, next) {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    const stats = await dashboard.getEventStats(eventId, userId);
    res.json({ stats });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  myEvents,
  registrations,
  attendance,
  analytics
};
