const initialState = {
  pokemons: [],
    allPokemons: [],
    types: [],
    // dog_details: [],
    // pokemonsWeight: [],
  };
  
  const rootReducer = (state = initialState, action) => {

    switch (action.type) {
      case "GET_POKEMONS":
        return {
          ...state,
          pokemons: action.payload,
          allpokemons: action.payload
        };

        case 'FILTER_CREATED':
          const allPokemonsCF = state.allPokemons;
          const createdFilter = action.payload === 'created' ? 
          allPokemonsCF.filter(element => element.createdInDb) : 
          allPokemonsCF.filter(element=> !element.createdInDb);
          return{
            ...state,
            pokemons: action.payload === 'all' ? 
            state.allPokemons : 
            createdFilter
          }

        case 'ORDER_BY_NAME':
          let sortedArrayNames = action.payload === 'asc' ?
          state.pokemons.sort(function(a,b){
            if (a.name > b.name){
              return 1;
            }
            if (b.name > a.name){
              return -1;
            }
            return 0;
          }) :
          state.pokemons.sort(function(a,b){
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
            pokemons:sortedArrayNames
          }

      case 'ORDER_BY_ATTACK':
        let sortedArrayAttack = action.payload === 'asc' ?
        state.pokemons.sort(function(a,b){
          if (a.attack > b.attack){
            return 1;
          }
          if (b.attack > a.attack){
            return -1;
          }
          return 0;
        }) :
        state.pokemons.sort(function(a,b){
          if (a.attack > b.attack){
            return -1;
          }
          if (b.attack > a.attack){
            return 1;
          }
          return 0;
        })
        return{
          ...state,
          pokemons:sortedArrayAttack
        }

        case "GET_TYPES":
          return {
            ...state,
            temperaments: action.payload,
          };

        case 'POST_POKEMON':
          return{
            ...state
          }

        default: return {...state};
        
      }
    };

export default rootReducer;
