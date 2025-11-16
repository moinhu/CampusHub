const { Attendance, Registration, Event } = require('../models');

async function markAttendance(scannerUserId, userId, eventId) {
  // 1) Verify event exists
  const event = await Event.findByPk(eventId);
  if (!event) throw new Error('Event not found');

  // 2) Verify user is registered
  const reg = await Registration.findOne({ where: { userId, eventId } });
  if (!reg) throw new Error('User is not registered for this event');

  if (reg.status !== 'confirmed') {
    throw new Error('User is not confirmed for this event');
  }

  // 3) Prevent double attendance
  const existing = await Attendance.findOne({ where: { userId, eventId } });

  if (existing) {
    throw new Error('Attendance already marked');
  }

  // 4) Record attendance
  const record = await Attendance.create({
    userId,
    eventId,
    scannedBy: scannerUserId
  });

  return record;
}

module.exports = {
  markAttendance
};
