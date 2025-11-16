const adminService = require('../services/admin.service');

// USER MANAGEMENT
async function users(req, res, next) {
  try {
    const list = await adminService.listUsers();
    res.json({ users: list });
  } catch (err) { next(err); }
}

async function changeRole(req, res, next) {
  try {
    const { role } = req.body;
    const userId = req.params.userId;

    const user = await adminService.updateUserRole(userId, role);
    res.json({ updated: user });
  } catch (err) { next(err); }
}

// CLUB MANAGEMENT
async function clubs(req, res, next) {
  try {
    const list = await adminService.listClubs();
    res.json({ clubs: list });
  } catch (err) { next(err); }
}

async function removeClub(req, res, next) {
  try {
    const clubId = req.params.clubId;
    const ok = await adminService.deleteClub(clubId);
    res.json({ success: ok });
  } catch (err) { next(err); }
}

// VENUE MANAGEMENT
async function venues(req, res, next) {
  try {
    const list = await adminService.listVenues();
    res.json({ venues: list });
  } catch (err) { next(err); }
}

async function createVenue(req, res, next) {
  try {
    const { name, capacity, location } = req.body;
    const venue = await adminService.createVenue(name, capacity, location);
    res.status(201).json({ venue });
  } catch (err) { next(err); }
}

// EVENT APPROVAL
async function pendingEvents(req, res, next) {
  try {
    const list = await adminService.pendingEvents();
    res.json({ pending: list });
  } catch (err) { next(err); }
}

// ANALYTICS
async function stats(req, res, next) {
  try {
    const data = await adminService.campusStats();
    res.json({ stats: data });
  } catch (err) { next(err); }
}

async function heatmap(req, res, next) {
  try {
    const data = await adminService.dailyEventHeatmap();
    res.json({ heatmap: data });
  } catch (err) { next(err); }
}

module.exports = {
  users,
  changeRole,
  clubs,
  removeClub,
  venues,
  createVenue,
  pendingEvents,
  stats,
  heatmap
};
