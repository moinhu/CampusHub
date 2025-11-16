const { Op } = require('sequelize');
const { Event, Venue, EventApproval, Club } = require('../models');
const { sequelize } = require('../config/mysql');

function timesOverlap(startA, endA, startB, endB) {
  return (startA < endB) && (startB < endA);
}

/**
 * Check if a venue is free between startTime and endTime.
 * Returns true if free, false if conflict found (with conflicting event).
 */
async function isVenueAvailable(venueId, startTime, endTime, excludeEventId = null) {
  const where = {
    venueId,
    status: { [Op.not]: 'cancelled' }, // ignore cancelled
    [Op.or]: [
      {
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime },
      },
    ],
  };
  if (excludeEventId) where.id = { [Op.not]: excludeEventId };

  const conflict = await Event.findOne({ where });
  return conflict ? { free: false, conflict } : { free: true };
}

async function createEvent(payload) {
  // payload should include: title, description, venueId, clubId, startTime, endTime, registrationDeadline, maxRegistrations, mode, posterUrl
  // Basic validation
  const start = new Date(payload.startTime);
  const end = new Date(payload.endTime);
  if (isNaN(start) || isNaN(end) || start >= end) {
    throw new Error('Invalid startTime/endTime');
  }
  if (payload.registrationDeadline) {
    const rd = new Date(payload.registrationDeadline);
    if (isNaN(rd)) throw new Error('Invalid registrationDeadline');
    if (rd >= start) throw new Error('registrationDeadline must be before startTime');
  }

  // Ensure venue exists
  const venue = await Venue.findByPk(payload.venueId);
  if (!venue) throw new Error('Venue not found');

  // Venue availability check
  const { free, conflict } = await isVenueAvailable(payload.venueId, start, end);
  if (!free) {
    const msg = `Venue conflict with event id ${conflict.id} (${conflict.title}) starting ${conflict.startTime}`;
    throw new Error(msg);
  }

  // Create event (status pending)
  const ev = await Event.create({
    title: payload.title,
    description: payload.description || null,
    venueId: payload.venueId,
    clubId: payload.clubId,
    startTime: start,
    endTime: end,
    registrationDeadline: payload.registrationDeadline || null,
    maxRegistrations: payload.maxRegistrations || null,
    posterUrl: payload.posterUrl || null,
    mode: payload.mode || 'Technical',
    status: 'pending',
  });

  // Create a pending approval entry
  await EventApproval.create({ eventId: ev.id, status: 'pending' });

  return ev;
}

async function approveEvent(eventId, approverUserId, approve = true, comment = null) {
  return sequelize.transaction(async (t) => {
    const ev = await Event.findByPk(eventId, { transaction: t });
    if (!ev) throw new Error('Event not found');

    // If already approved/rejected, prevent re-approve (idempotence)
    if (ev.status === 'approved' && approve) return ev;
    if (ev.status === 'rejected' && !approve) return ev;

    // If approving, re-check venue availability in case another event got approved meanwhile.
    if (approve) {
      const { free, conflict } = await isVenueAvailable(ev.venueId, ev.startTime, ev.endTime, ev.id);
      if (!free) {
        throw new Error(`Cannot approve: venue conflict with event id ${conflict.id}`);
      }
      ev.status = 'approved';
    } else {
      ev.status = 'rejected';
    }
    await ev.save({ transaction: t });

    // Update approval record
    const approval = await EventApproval.findOne({ where: { eventId: ev.id }, transaction: t });
    if (approval) {
      approval.status = approve ? 'approved' : 'rejected';
      approval.approvedBy = approverUserId;
      approval.comment = comment || null;
      await approval.save({ transaction: t });
    } else {
      await EventApproval.create({
        eventId: ev.id,
        approvedBy: approverUserId,
        status: approve ? 'approved' : 'rejected',
        comment,
      }, { transaction: t });
    }

    return ev;
  });
}

async function getEvents(filter = {}) {
  // basic filters: status, clubId, upcomingOnly
  const where = {};
  if (filter.status) where.status = filter.status;
  if (filter.clubId) where.clubId = filter.clubId;
  if (filter.mode) where.mode = filter.mode;
  if (filter.upcomingOnly) where.endTime = { [Op.gt]: new Date() };

  const events = await Event.findAll({
    where,
    include: [{ model: Venue }, { model: Club }, { model: EventApproval }],
    order: [['startTime', 'ASC']],
  });
  return events;
}

module.exports = {
  isVenueAvailable,
  createEvent,
  approveEvent,
  getEvents,
};
