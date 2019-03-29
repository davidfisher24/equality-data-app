export default function reducer(state={
  data: [],
  selected: null,
  fetching: false,
  fetched: false,
  error: null
}, action){
  switch (action.type) {
    case "REQUEST_CATEGORY":{
      return {...state, fetching: true}
    }
    case "RECIEVE_CATEGORY":{
      return {
              ...state,
              fetching: false,
              fetched: true,
              data:action.payload
              }
    }
    case "ERROR_CATEGORY":{
       return {
                ...state,
                fetching: false,
                error: action.payload
              }
     }
     case "SELECT_CATEGORY":{
       return {
                ...state,
                selected: parseInt(action.payload)
              }
     }
     case "UNSELECT_CATEGORY":{
       return {
                ...state,
                selected: null
              }
     }
     default: {
       return state
     }
  }
}