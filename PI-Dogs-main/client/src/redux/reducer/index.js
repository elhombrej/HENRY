const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    // dog_details: [],
    // dogsWeight: [],
  };
  
  const rootReducer = (state = initialState, action) => {

    switch (action.type) {
      case "GET_DOGS":
        return {
          ...state,
          dogs: action.payload,
          // ...state,
          // allDogs: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
          allDogs: action.payload
        };
        case 'FILTER_BY_STATUS':
          const allDogs = state.allDogs;
          const statusFiltered = action.payload === 'all' ? allDogs : allDogs.filter(element =>element.status === action.payload);

          return{
            ...state,
            dogs: statusFiltered   
          }
        case 'FILTER_CREATED':
          const statusFiltered2 = action.payload === 'created' ? state.allDogs.filter(element => element.createdInDb) : state.allDogs.filter(element=> !element.createdInDb);
          return{
            ...state,
            dogs:action.payload === 'all' ? state.allDogs : statusFiltered2
          }
        case 'ORDER_BY_NAME':
          let sortedArr = action.payload === 'asc' ?
          state.dogs.sort(function(a,b){
            if (a.name > b.name){
              return 1;
            }
            if (b.name > a.name){
              return -1;
            }
            return 0;
          }) :
          state.dogs.sort(function(a,b){
            if (a.name > b.name){
              return -1;
            }
            if (b.name > a.name){
              return 1;
            }
            return 0;
          })
          return{
            ...state,
            dogs:sortedArr
          }
        case 'GET_NAME_DOGS':
          return {
            ...state,
            dogs: action.payload
          }
        case "GET_TEMPERAMENTS":
          return {
            ...state,
            temperaments: action.payload,
          };
        case 'POST_DOG':
          return{
            ...state
          }
        // case "FILTER_TEMPERAMENTS":
        //   const dogsTemp = state.copyAllDogs.filter((d) =>
        //   d.temperament?.includes(action.payload) ? d : null
        //   );
        //   return {
        //     ...state,
        //     allDogs: dogsTemp,
        //   };
        // case "GET_QUERY":
        //   return {
        //     ...state,
        //     allDogs: action.payload,
        //   };
        default:
          return {...state};
        }            
  };

export default rootReducer;
