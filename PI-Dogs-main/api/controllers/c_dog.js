const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { DB_APIKEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${DB_APIKEY}`
  );
  const apiInfo = await apiUrl.data.map((d) => {
    return {
      id: d.id,
      name: d.name,
      min_height: d.height.metric.split("-")[0].trim(),
      max_height: d.height.metric.split("-").reverse()[0].trim(),
      min_weight: d.weight.metric.split("-")[0].trim(),
      max_weight: d.weight.metric.split("-").reverse()[0].trim(),
      life_span: d.life_span,
      image: d.image.url,
      temperament: d.temperament,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return Dog.findAll({
    //el findAll devuelve siempre un arreglo
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  let dbInfo = await getDbInfo();
  dbInfo = await dbInfo.map((d) => {
    return {
      id: d.id,
      name: d.name,
      min_height: d.min_height,
      max_height: d.max_height,
      min_weight: d.min_weight,
      max_weight: d.max_weight,
      life_span: d.life_span,
      image: d.image,
      temperament: d.temperaments
        .map((t) => {
          return t.name;
        })
        .join(", "),
      createdInDb: d.createdInDb
    };
  });
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllInfo,
};
