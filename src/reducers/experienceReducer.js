export default function reducer(state={
  data: [],
  fetching: false,
  fetched: false,
  error: null,
  building: {
    name: '',
    email: '',
    location: '',
    text: 'Tell us your experience',
    CategoryId: null
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
     case "EMPTY_EXPERIENCE": {
      return {
          ...state,
          building: {
            name: '',
            email: '',
            location: '',
            text: 'Tell us your experience',
            CategoryId: null
          }
        }
     }
     default: {
       return state
     }
  }
}