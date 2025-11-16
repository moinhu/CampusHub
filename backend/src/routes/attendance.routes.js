const express = require("express");
const router = express.Router();

const { authenticateJWT, authorizeRoles } = require("../middleware/auth.middleware");

const { Attendance, Event, User } = require("../models");

// Mark attendance
router.post(
  "/mark",
  authenticateJWT,
  authorizeRoles("club", "admin"),
  async (req, res) => {
    try {
      const { eventId, userId } = req.body;

      if (!eventId || !userId)
        return res.status(400).json({ error: "eventId and userId required" });

      const event = await Event.findByPk(eventId);
      if (!event) return res.status(404).json({ error: "Event not found" });

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const exists = await Attendance.findOne({ where: { eventId, userId } });
      if (exists) return res.status(400).json({ error: "Already marked present" });

      const att = await Attendance.create({ eventId, userId });

      res.json({ success: true, attendance: att });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get attendance for event
router.get(
  "/event/:id",
  authenticateJWT,
  authorizeRoles("club", "admin"),
  async (req, res) => {
    try {
      const eventId = req.params.id;

      const list = await Attendance.findAll({
        where: { eventId },
        include: [{ model: User, attributes: ["id", "fullName", "email"] }],
      });

      res.json({ attendees: list });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
