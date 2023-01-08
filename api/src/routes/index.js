const { Router } = require("express");
const router = Router();

// RUTAS
const countries = require("./countries.routes");
const activities = require("./activities.routes");

// PUERTOS
router.use("/countries", countries);
router.use("/activities", activities);

// Exportamos
module.exports = router;
