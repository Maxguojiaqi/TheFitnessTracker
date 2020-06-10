// bring in the required modules
const router = require("express").Router();
var path = require("path");

// send exercise html to the front
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

// send stats html to the front
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

  
module.exports = router;