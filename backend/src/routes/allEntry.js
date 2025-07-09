const express = require("express");
const router = express.Router();
const { getAllEntries } = require("../controllers/entryController");

router.get("/entries", getAllEntries); // ✅ this triggers the controller above

module.exports = router;
