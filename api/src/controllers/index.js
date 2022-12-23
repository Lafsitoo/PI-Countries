const axios = require("axios");
const API_ALL_URL = "https://restcountries.com/v3/all";
// Traigo los modelos
const { Country, Activity } = require("../db");

// DATOS ( API )
const getAllApi = async () => {
  const apiUrl = await axios(API_ALL_URL);
  // Reducimos la info
  const infoApi = await apiUrl.data.map((el) => {
    return {
      id: el.cca3,
      name: el.name.common,
      flags: el.flags[0],
      continent: el.continents[0],
      capital: el.capital ? el.capital[0] : "Este país no tiene capital.",
      subregion: el.subregion,
      area: el.area,
      population: el.population,
    };
  });
  // Retornamos
  return infoApi;
};

// DATOS ( DB )
const getInfoDb = async () => {
  return await Country.findAll({
    // Incluimos el modelo de Actividades dentro de esta
    includes: {
      model: Activity,
      attributes: ["name"],
      // Sobre esta tabla
      through: {
        attributes: [],
      },
    },
  });
};

// UNION DE DATOS
const getAllCountrys = async () => {
  const apiInfo = await getAllApi();
  const dbInfo = await getInfoDb();
  const allCountrys = apiInfo.concat(dbInfo);
  return allCountrys;
};

// Exportamos
module.exports = {
  getAllCountrys,
};
