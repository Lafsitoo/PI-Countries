const { Router } = require("express");
const { Activity, Country } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allActivities = await Activity.findAll({
      include: Country,
    });

    // Filtro para el front-end que trae todas las actividades
    const filterA = allActivities.map((e) => e.name.toLowerCase());
    const total = filterA.filter((item, index) => {
      return filterA.indexOf(item) === index;
    });
    res.json(total);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al obtener actividades" });
  }
});

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    const activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    await activity.setCountries(countries);

    const activityWithCountry = await Activity.findOne({
      where: { name },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
      include: {
        model: Country,
        through: {
          attributes: [],
        },
      },
    });
    res.json(activityWithCountry);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al crear actividad" });
  }
});

module.exports = router;
