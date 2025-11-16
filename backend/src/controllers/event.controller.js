const eventService = require('../services/event.service');
const { Event } = require('../models');

async function createEvent(req, res, next) {
  try {
    const clubId = req.body.clubId || (req.user && req.user.role === 'club' ? req.user.id : null);
    // For simplicity, assume req.user.id maps to a club record; in real projects you map users->club membership.
    if (!clubId) return res.status(400).json({ error: 'clubId required (or create club-user mapping)' });

    const payload = {
      ...req.body,
      clubId,
    };
    const ev = await eventService.createEvent(payload);
    res.status(201).json({ event: ev });
  } catch (err) {
    next(err);
  }
}

async function listEvents(req, res, next) {
  try {
    const filter = {
      status: req.query.status,
      clubId: req.query.clubId,
      mode: req.query.mode,
      upcomingOnly: req.query.upcomingOnly === 'true',
    };
    const events = await eventService.getEvents(filter);
    res.json({ events });
  } catch (err) {
    next(err);
  }
}

async function getEvent(req, res, next) {
  try {
    const id = req.params.id;
    const ev = await Event.findByPk(id);
    if (!ev) return res.status(404).json({ error: 'Event not found' });
    res.json({ event: ev });
  } catch (err) {
    next(err);
  }
}

async function approveEvent(req, res, next) {
  try {
    const id = req.params.id;
    const { approve = true, comment } = req.body;
    const approverUserId = req.user.id;
    const ev = await eventService.approveEvent(id, approverUserId, approve === true || approve === 'true', comment);
    res.json({ event: ev });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createEvent,
  listEvents,
  getEvent,
  approveEvent,
};
