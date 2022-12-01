import axios from "axios";

export const getDogs = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: "GET_DOGS",
        payload: json.data,
      });
    } catch (error) {
      return { error: error.message};
    }
  };
};

export function filterDogsByStatus(payload){
  return {
    type:'FILTER_BY_STATUS',
    payload
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

export function getNameDogs(name){
  return async function (dispatch){
      try{/*`https://api.thedogapi.com/v1/breeds/search?q=*/
        let json = await axios.get(`/dogs/${name}`);
        return dispatch({
          type: "GET_NAME_DOGS",
          payload:json.data,
        })
      }catch(error){
        console.log(error)
      }
    }
};


export function getTemperaments(){//get temperament name
    return async function(dispatch) {
      // try {
        const info = await axios.get("http://localhost:3001/temperaments",{});
        return dispatch({
          type: "GET_TEMPERAMENTS",
          payload: info.data,
        });
      // } catch (error) {
        // return { error: error.message};
      // }
    };
};

// export function postDog(payload){
//   return async function(dispatch){
//     const json = await axios.post("http://localhost3001/dog",payload);
//     console.log(json);
//     return json;
//   }
// }

export const postDog = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.post("http://localhost:3001/dog", payload);
      console.log(json);
      return json;
    } catch (error) {
      return { error: error.message};
    }
  };
};

// export const filterTemperaments = (payload) => {
//     return {
//       type: "FILTER_TEMPERAMENTS",
//       payload: payload,
//     };
//   };
//
// export const getQuery = (payload) => {
//     return async (dispatch) => {
//       try {
//         const json = await axios.get(`/dogs?name=${payload}`)
//         return dispatch({
//           type: "GET_QUERY",
//           payload: json.data
//         })
//       } catch (error) {
//         return { error: error.message}
//       }
//     }
//   }
  