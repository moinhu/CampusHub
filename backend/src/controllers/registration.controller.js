const regService = require('../services/registration.service');

async function register(req, res, next) {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;

    const reg = await regService.registerUser(userId, eventId);
    res.status(201).json({ registration: reg });
  } catch (err) {
    next(err);
  }
}

async function cancel(req, res, next) {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    const reg = await regService.cancelRegistration(userId, eventId);
    res.json({ cancelled: reg });
  } catch (err) {
    next(err);
  }
}

async function myRegistrations(req, res, next) {
  try {
    const userId = req.user.id;
    const list = await regService.getMyRegistrations(userId);
    res.json({ registrations: list });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  cancel,
  myRegistrations
};
