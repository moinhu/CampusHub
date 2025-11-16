const { Event, Registration, Attendance, Club, ClubMember, Venue } = require('../models');
const { Op } = require('sequelize');

async function getMyClubId(userId) {
  // A user might belong to multiple clubs; pick the first for now
  const membership = await ClubMember.findOne({ where: { userId } });

  if (!membership) throw new Error('You are not assigned to any club');

  return membership.clubId;
}

async function getMyClubEvents(userId) {
  const clubId = await getMyClubId(userId);

  const events = await Event.findAll({
    where: { clubId },
    include: [Venue],
    order: [['startTime', 'ASC']]
  });

  return events;
}

async function getEventRegistrations(eventId, userId) {
  // verify the club owns this event
  const clubId = await getMyClubId(userId);

  const event = await Event.findOne({ where: { id: eventId, clubId } });

  if (!event) throw new Error('Not allowed to view this event');

  const regs = await Registration.findAll({
    where: { eventId },
    include: ['User']
  });

  return regs;
}

async function getEventAttendance(eventId, userId) {
  const clubId = await getMyClubId(userId);

  const event = await Event.findOne({ where: { id: eventId, clubId } });

  if (!event) throw new Error('Not allowed to view this event');

  const att = await Attendance.findAll({
    where: { eventId },
    include: ['User']
  });

  return att;
}

async function getEventStats(eventId, userId) {
  const clubId = await getMyClubId(userId);

  const event = await Event.findOne({
    where: { id: eventId, clubId }
  });

  if (!event) throw new Error('Not allowed to view this event');

  // counts
  const confirmed = await Registration.count({
    where: { eventId, status: 'confirmed' }
  });

  const waitlisted = await Registration.count({
    where: { eventId, status: 'waitlisted' }
  });

  const cancelled = await Registration.count({
    where: { eventId, status: 'cancelled' }
  });

  const attended = await Attendance.count({
    where: { eventId }
  });

  return {
    confirmed,
    waitlisted,
    cancelled,
    attended
  };
}

module.exports = {
  getMyClubId,
  getMyClubEvents,
  getEventRegistrations,
  getEventAttendance,
  getEventStats
};
