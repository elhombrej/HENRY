// const axios = require ('axios');
import axios from "axios";

// let reqInstance = axios.create({
//     headers: {
//         "Accept-Encoding": "null"
//       }
//     }
// );


export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: "GET_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      return { error: error.message};
    }
  };
};

export function filterCreated(payload){
    return{
      type: 'FILTER_CREATED',
      payload
    }
  };
  

export function orderByName(payload){
    return{
      type: 'ORDER_BY_NAME',
      payload
    }
};

export function orderByAttack(payload){
    return{
      type: 'ORDER_BY_ATTACK',
      payload
    }
  };
  
