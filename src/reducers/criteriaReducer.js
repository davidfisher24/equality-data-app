export default function reducer(state={
  data: [],
  fetching: false,
  fetched: false,
  error: null
}, action){
  switch (action.type) {
    case "REQUEST_CRITERIA":{
      return {...state, fetching: true}
    }
    case "RECIEVE_CRITERIA":{
      return {
              ...state,
              fetching: false,
              fetched: true,
              data:action.payload
              }
    }
     case "ERROR_CRITERIA":{
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