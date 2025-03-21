const express = require("express");
const { examController } = require("../controllers/exam");

const router = express.Router();

router.route("/upload-screen-record").post(examController.upload())

module.exports.examRouter = router;