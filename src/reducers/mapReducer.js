export default function reducer(state={
  geojson: { type: 'FeatureCollection', features: [] },
  fetching: false,
  fetched: false,
  error: null
}, action){
  switch (action.type) {
    case "REQUEST_MAP":{
      return {...state, fetching: true}
    }
    case "RECIEVE_MAP":{
      return {
              ...state,
              fetching: false,
              fetched: true,
              geojson:action.payload
              }
    }
     case "ERROR_MAP":{
       return {
                ...state,
                fetching: false,
                error: action.payload
              }
     }
     default: {
       return state
     }
  }
}