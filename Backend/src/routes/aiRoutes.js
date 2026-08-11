const express = require("express");
const { processAiRequest } = require("../controllers/aiController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/match", requireAuth, processAiRequest);

module.exports = router;
