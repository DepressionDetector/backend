const express = require("express");
const { handleSavePHQ9Answer, handleGetAllPHQ9Answers } = require("../controllers/phq9Controller");

const router = express.Router();
router.post("/phq9-save", handleSavePHQ9Answer);
router.get("/phq9-all", handleGetAllPHQ9Answers)

module.exports = router;
