const { Event, Registration, Venue, Club } = require('../models');
const { Op } = require('sequelize');

// Today’s events
async function getTodaysEvents() {
  const today = new Date();

  const startOfDay = new Date(today.setHours(0,0,0,0));
  const endOfDay = new Date(today.setHours(23,59,59,999));

  const events = await Event.findAll({
    where: {
      startTime: { [Op.between]: [startOfDay, endOfDay] },
      status: 'approved'
    },
    include: [Venue, Club]
  });

  return events;
}

// Events student registered for
async function getMyRegisteredEvents(userId) {
  const regs = await Registration.findAll({
    where: { userId, status: { [Op.not]: 'cancelled' } },
    include: [{ 
      model: Event,
      include: [Venue, Club]
    }]
  });

  return regs.map(r => ({
    registrationId: r.id,
    status: r.status,
    qrCode: r.qrCode,
    event: r.Event
  }));
}

// Upcoming events (approved only)
async function getUpcomingEvents() {
  return await Event.findAll({
    where: {
      startTime: { [Op.gt]: new Date() },
      status: 'approved'
    },
    include: [Venue, Club],
    order: [['startTime', 'ASC']]
  });
}

// Past events student attended or registered
async function getPastEvents(userId) {
  const now = new Date();

  const regs = await Registration.findAll({
    where: { userId },
    include: [{
      model: Event,
      where: { endTime: { [Op.lt]: now } },
      include: [Venue, Club]
    }]
  });

  return regs.map(r => r.Event);
}

module.exports = {
  getTodaysEvents,
  getMyRegisteredEvents,
  getUpcomingEvents,
  getPastEvents
};
