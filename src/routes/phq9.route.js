const express = require("express");
const { handleSavePHQ9Answer } = require("../controllers/phq9Controller");

const router = express.Router();
router.post("/phq9-save", handleSavePHQ9Answer);
module.exports = router;
