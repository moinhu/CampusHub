const attendanceService = require('../services/attendance.service');

async function scan(req, res, next) {
  try {
    const scannerUserId = req.user.id;  // club user scanning
    const { userId, eventId } = req.body;

    const record = await attendanceService.markAttendance(
      scannerUserId,
      userId,
      eventId
    );

    res.json({ attendance: record });
  } catch (err) {
    next(err);
  }
}

module.exports = { scan };
