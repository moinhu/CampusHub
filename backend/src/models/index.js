// ------------------------------------------------------------
// LOAD SEQUELIZE INSTANCE + REGISTER ALL MODELS
// IMPORTANT: This file must load BEFORE sequelize.sync()
// ------------------------------------------------------------

const { sequelize } = require("../config/mysql"); // ⬅️ MISSING EARLIER (IMPORTANT)

// Load models
const User = require("./user.model");
const Club = require("./club.model");
const Venue = require("./venue.model");
const Event = require("./event.model");
const EventApproval = require("./eventApproval.model");
const ClubMember = require("./clubMember.model");
const Registration = require("./registration.model");
const Attendance = require("./attendance.model");

// ------------------------------------------------------------
// DEFINE ALL MODEL ASSOCIATIONS
// ------------------------------------------------------------

// Club → Events (1:M)
Club.hasMany(Event, { foreignKey: "clubId", onDelete: "CASCADE" });
Event.belongsTo(Club, { foreignKey: "clubId" });

// Venue → Events (1:M)
Venue.hasMany(Event, { foreignKey: "venueId", onDelete: "RESTRICT" });
Event.belongsTo(Venue, { foreignKey: "venueId" });

// Event → Approval (1:1)
Event.hasOne(EventApproval, { foreignKey: "eventId", onDelete: "CASCADE" });
EventApproval.belongsTo(Event, { foreignKey: "eventId" });

// User ↔ Club (Many-to-Many)
User.belongsToMany(Club, { through: ClubMember, foreignKey: "userId" });
Club.belongsToMany(User, { through: ClubMember, foreignKey: "clubId" });

// ClubMember relations
Club.hasMany(ClubMember, { foreignKey: "clubId" });
ClubMember.belongsTo(Club, { foreignKey: "clubId" });

User.hasMany(ClubMember, { foreignKey: "userId" });
ClubMember.belongsTo(User, { foreignKey: "userId" });

// User → Registrations (1:M)
User.hasMany(Registration, { foreignKey: "userId", onDelete: "CASCADE" });
Registration.belongsTo(User, { foreignKey: "userId" });

// Event → Registrations (1:M)
Event.hasMany(Registration, { foreignKey: "eventId", onDelete: "CASCADE" });
Registration.belongsTo(Event, { foreignKey: "eventId" });

// Event → Attendance (1:M)
Event.hasMany(Attendance, { foreignKey: "eventId", onDelete: "CASCADE" });
Attendance.belongsTo(Event, { foreignKey: "eventId" });

// User → Attendance (1:M)
User.hasMany(Attendance, { foreignKey: "userId", onDelete: "CASCADE" });
Attendance.belongsTo(User, { foreignKey: "userId" });

// ------------------------------------------------------------
// EXPORT EVERYTHING (VERY IMPORTANT FOR CONTROLLERS)
// ------------------------------------------------------------
module.exports = {
  sequelize,
  User,
  Club,
  Venue,
  Event,
  EventApproval,
  ClubMember,
  Registration,
  Attendance,
};
