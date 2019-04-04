export default function reducer(state={
  data: [],
  types: [],
  fetching: false,
  fetched: false,
  error: null,
  addingToMap: false,
  building: {
    name: '',
    email: '',
    location: '',
    text: 'Tell us your experience',
    category: null,
    latitude: null,
    longitude: null,
    country: null,
    countryName: null,
    type: 1,
  }
}, action){
  switch (action.type) {
    case "REQUEST_EXPERIENCE":{
      return {...state, fetching: true}
    }
    case "RECIEVE_EXPERIENCE":{
      return {
              ...state,
              fetching: false,
              fetched: true,
              data:action.payload
              }
    }
    case "RECIEVE_EXPERIENCE_TYPES":{
      return {
              ...state,
              fetching: false,
              fetched: true,
              types:action.payload
              }
    }
     case "ERROR_EXPERIENCE":{
       return {
                ...state,
                fetching: false,
                error: action.payload
              }
     }
     case "BUILD_EXPERIENCE": {
      return {
          ...state,
          building: action.payload
        }
     }
     case "ADD_EXPERIENCE_POINT": {
      return {
          ...state,
          building: {
            ...state.building, 
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
            country: action.payload.isocode,
            countryName: action.payload.countryName
          }
        }
     }
     case "RESET_EXPERIENCE_POINT": {
      return {
          ...state,
          building: {
            ...state.building, 
            latitude: null,
            longitude: null,
            country: null,
            countryName: null,
          }
        }
     }
     case "EMPTY_EXPERIENCE": {
      return {
          ...state,
          building: {
            name: '',
            email: '',
            location: '',
            text: 'Tell us your experience',
            category: null,
            type: 1,
            longitude: null,
            latitude: null,
            country: null,
            countryName: null,
          }
        }
     }
     case "START_ADDING_EXPERIENCE": {
      return {
          ...state,
          addingToMap: true,
        }
     }
     case "STOP_ADDING_EXPERIENCE": {
      return {
          ...state,
          addingToMap: false,
        }
     }
     default: {
       return state
     }
  }
}