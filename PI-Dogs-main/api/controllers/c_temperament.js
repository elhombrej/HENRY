const axios = require("axios");
const { Temperament } = require("../db");
const { DB_APIKEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${DB_APIKEY
}`
  );
  const apiInfo = await apiUrl.data;
  const temperaments = apiInfo
    .map((d) => d.temperament)
    .join()
    .split(",")
    .sort();

  await temperaments
    .filter((t, i) => temperaments.indexOf(t) === i)
    .forEach(
      (t) =>
        t.trim() !== "" &&
        Temperament.findOrCreate({
          where: {
            name: t.trim(),
          },
        })
    );

  const allTemperaments = await Temperament.findAll({ order: [["name"]] });
  return allTemperaments;
};

module.exports = {
  getApiInfo,
};
