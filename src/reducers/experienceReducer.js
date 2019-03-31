export default function reducer(state={
  data: [],
  fetching: false,
  fetched: false,
  error: null
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
     default: {
       return state
     }
  }
}