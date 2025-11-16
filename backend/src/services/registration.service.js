const QRCode = require('qrcode');
const { Registration, Event } = require('../models');
const { Op } = require('sequelize');

async function getConfirmedCount(eventId) {
  return await Registration.count({
    where: { eventId, status: 'confirmed' }
  });
}

async function registerUser(userId, eventId) {
  const event = await Event.findByPk(eventId);
  if (!event) throw new Error('Event not found');

  // Check if already registered
  const existing = await Registration.findOne({ where: { userId, eventId } });
  if (existing) {
    if (existing.status === 'cancelled') {
      // User cancelled earlier → revive old registration
      existing.status = 'waitlisted';
      await existing.save();
      return existing;
    }
    throw new Error('Already registered');
  }

  // Seat logic
  const confirmedCount = await getConfirmedCount(eventId);
  const seats = event.maxRegistrations;

  let status = 'waitlisted';
  if (!seats || confirmedCount < seats) {
    status = 'confirmed';
  }

  // Generate QR only for confirmed users
  let qr = null;
  if (status === 'confirmed') {
    qr = await QRCode.toDataURL(JSON.stringify({ userId, eventId }));
  }

  const reg = await Registration.create({
    userId,
    eventId,
    status,
    qrCode: qr
  });

  return reg;
}

async function cancelRegistration(userId, eventId) {
  const reg = await Registration.findOne({ where: { userId, eventId } });
  if (!reg) throw new Error('Registration not found');

  reg.status = 'cancelled';
  await reg.save();

  // Promote a waitlisted user (if any)
  const waitlist = await Registration.findOne({
    where: { eventId, status: 'waitlisted' },
    order: [['createdAt', 'ASC']]
  });

  if (waitlist) {
    waitlist.status = 'confirmed';
    waitlist.qrCode = await QRCode.toDataURL(JSON.stringify({
      userId: waitlist.userId,
      eventId
    }));
    await waitlist.save();
  }

  return reg;
}

async function getMyRegistrations(userId) {
  return await Registration.findAll({
    where: { userId },
    include: [{ model: Event }]
  });
}

module.exports = {
  registerUser,
  cancelRegistration,
  getMyRegistrations
};
