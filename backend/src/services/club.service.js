const { Club, ClubMember, User } = require('../models');

async function createClub(name, description) {
  const exists = await Club.findOne({ where: { name } });
  if (exists) throw new Error('Club already exists');

  const club = await Club.create({ name, description });
  return club;
}

async function addMember(userId, clubId, role = 'member') {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  const club = await Club.findByPk(clubId);
  if (!club) throw new Error('Club not found');

  const member = await ClubMember.create({ userId, clubId, role });
  return member;
}

async function getClubMembers(clubId) {
  const members = await ClubMember.findAll({
    where: { clubId },
    include: [{ model: User, attributes: ['id', 'fullName', 'email', 'role'] }]
  });

  return members;
}

async function getMyClubs(userId) {
  const records = await ClubMember.findAll({
    where: { userId },
    include: [{ model: Club }]
  });

  return records.map(r => r.Club);
}

module.exports = {
  createClub,
  addMember,
  getClubMembers,
  getMyClubs,
};
