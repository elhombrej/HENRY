const initialState = {
    allDogs: [],
    copyAllDogs: [],
    temperaments: [],
    dog_details: [],
    dogsWeight: [],
  };
  
  const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_DOGS":
            return {
              ...state,
              allDogs: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
              copyAllDogs: action.payload,
            };
        case "GET_TEMPERAMENTS":
            return {
              ...state,
              temperaments: action.payload,
            };
        case "FILTER_TEMPERAMENTS":
                const dogsTemp = state.copyAllDogs.filter((d) =>
                  d.temperament?.includes(action.payload) ? d : null
                );
                return {
                    ...state,
                    allDogs: dogsTemp,
                  };
        case "GET_QUERY":
            return {
                ...state,
                allDogs: action.payload,
              };
        default:
            return {
                ...state,
            };  
  }
                
  };

export default rootReducer;
