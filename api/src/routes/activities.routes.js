const { Router } = require("express");
const { Activity, Country } = require("../db");
const validateActivities = require("../middlewares");

const router = Router();

// Obtener una lista única de nombres de actividades
router.get("/", async (req, res) => {
  try {
    // Ejecuta una consulta SQL para obtener una lista única de nombres de actividades
    const activities = await Activity.sequelize.query(
      // Usando el método query de Sequelize y un objeto de opciones para indicar que se trata de una consulta de selección
      "SELECT DISTINCT name FROM activities",
      { type: Activity.sequelize.QueryTypes.SELECT }
    );
    // Devuelve la lista de nombres de actividades como respuesta
    res.status(200).json(activities);
  } catch (error) {
    // Si hay algún error, envía un error
    res.status(404).send({ error: "Error al obtener actividades" });
  }
});

// Crear una nueva actividad
router.post("/", validateActivities, async (req, res) => {
  // Obtiene los datos de la actividad de la solicitud
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    // Crea una nueva actividad en la base de datos
    let activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    // Obtiene los países relacionados con la actividad
    const activityWithCountry = await Country.findAll({
      where: { name: countries },
    });
    // Asocia los países con la actividad
    activity.addCountries(activityWithCountry);

    // Devuelve una respuesta
    res.status(201).send(`${name} Creado con Éxito`);
  } catch (error) {
    // Si hay algún error, envía un error 
    res.status(404).send({ error: "Error al crear actividad" });
  }
});

module.exports = router;
