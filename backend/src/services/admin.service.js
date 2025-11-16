const { User, Club, Venue, Event, Registration, Attendance } = require('../models');
const { Op } = require('sequelize');

// -----------------------------
// USER MANAGEMENT
// -----------------------------
async function listUsers() {
  return await User.findAll({
    attributes: ['id', 'fullName', 'email', 'role']
  });
}

async function updateUserRole(userId, role) {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  user.role = role;
  await user.save();
  return user;
}

// -----------------------------
// CLUB MANAGEMENT
// -----------------------------
async function listClubs() {
  return await Club.findAll();
}

async function deleteClub(clubId) {
  const club = await Club.findByPk(clubId);
  if (!club) throw new Error('Club not found');

  await club.destroy(); // cascades events & members
  return true;
}

// -----------------------------
// VENUE MANAGEMENT
// -----------------------------
async function listVenues() {
  return await Venue.findAll();
}

async function createVenue(name, capacity, location) {
  const exists = await Venue.findOne({ where: { name } });
  if (exists) throw new Error('Venue already exists');

  return await Venue.create({ name, capacity, location });
}

// -----------------------------
// EVENT APPROVAL (faculty OR admin)
// -----------------------------
async function pendingEvents() {
  return await Event.findAll({
    where: { status: 'pending' },
    include: [Club, Venue],
    order: [['startTime', 'ASC']]
  });
}

// -----------------------------
// CAMPUS ANALYTICS
// -----------------------------
async function campusStats() {
  const totalEvents = await Event.count({ where: { status: 'approved' } });
  const totalUsers = await User.count();
  const totalClubs = await Club.count();
  const totalRegistrations = await Registration.count();
  const totalAttendance = await Attendance.count();

  return {
    totalEvents,
    totalUsers,
    totalClubs,
    totalRegistrations,
    totalAttendance
  };
}

async function dailyEventHeatmap() {
  const events = await Event.findAll({
    where: { status: 'approved' },
    attributes: ['id', 'startTime']
  });

  const result = {};

  events.forEach(ev => {
    const day = new Date(ev.startTime).toISOString().split('T')[0];
    result[day] = (result[day] || 0) + 1;
  });

  return result;
}

module.exports = {
  listUsers,
  updateUserRole,
  listClubs,
  deleteClub,
  listVenues,
  createVenue,
  pendingEvents,
  campusStats,
  dailyEventHeatmap
};
