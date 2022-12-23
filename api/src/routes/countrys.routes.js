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

// Exportamos
module.exports = router;
