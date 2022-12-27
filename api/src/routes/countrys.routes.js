const { Router } = require("express");
const { Country, Activity } = require("../db");
const { getAllCountrys } = require("../controllers/index");
const router = Router();

// OBTENER TODOS LOS PAISES
// OBTENER POR NOMBRE
router.get("/", async (req, res) => {
  // Verificamos si nos mandan un nombre
  const { name } = req.query;
  try {
    const allCountrys = await getAllCountrys();
    if (name) {
      // Reducimos los errores de comparación
      const countryName = allCountrys.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      countryName.length
        ? res.status(200).json(countryName)
        : res
            .status(404)
            .send(`No se ha encuentrado ${name} en nuestra bibloteca`);
    } else {
      // Sino devolvemos todos los paises
      res.status(200).send(allCountrys);
    }
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
});

// OBTENER POR ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const countrysTotal = await getAllCountrys();
    // ¿Hay ID?
    if (id) {
      const countrysID = await countrysTotal.filter((e) => e.id === id);
      countrysID.length
        ? res.status(200).send(countrysID)
        : res.status(404).send("No fue posible encontrar el país");
    }
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
});

// CREAR UN PAÍS NUEVO
router.post("/", async (req, res) => {
  // Info requerida (con Activity)
  const {
    name,
    flags,
    continent,
    capital,
    subregion,
    area,
    population,
    activity,
    createByDb,
  } = req.body;
  try {
    // Creación sin Activity
    const countryCreated = await Country.create({
      name,
      flags,
      continent,
      capital,
      subregion,
      area,
      population,
      createByDb,
    });
    // Busqueda de Activity en su respectiva tabla
    const activityInDb = await Activity.findAll({
      where: { name: activity },
    });
    // Insertamos la activity al nuevo pais
    countryCreated.addActivity(activityInDb)
    res.status(200).send(`¡Felicidades! ${name} creado con Exito`)
  } catch (error) {
    res.status(404).send(error);
    console.log(error)
  }
});

// Exportamos
module.exports = router;
