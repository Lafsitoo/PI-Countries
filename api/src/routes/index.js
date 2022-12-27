const { Router } = require("express");
const router = Router();

// RUTAS
const countrys = require("./countrys.routes");
const activitys = require("./activitys.routes");

// PUERTOS
router.use("/countrys", countrys);
router.use("/activitys", activitys);

// Exportamos
module.exports = router;
