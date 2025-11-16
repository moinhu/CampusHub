const clubService = require('../services/club.service');

async function createClub(req, res, next) {
  try {
    const { name, description } = req.body;
    const club = await clubService.createClub(name, description);
    res.status(201).json({ club });
  } catch (err) {
    next(err);
  }
}

async function addMember(req, res, next) {
  try {
    const { userId, role } = req.body;
    const clubId = req.params.clubId;

    const member = await clubService.addMember(userId, clubId, role);
    res.status(201).json({ member });
  } catch (err) {
    next(err);
  }
}

async function getMyClubs(req, res, next) {
  try {
    const userId = req.user.id;
    const clubs = await clubService.getMyClubs(userId);
    res.json({ clubs });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createClub,
  addMember,
  getMyClubs,
};
