export default function reducer(state={
  data: [],
  selected: null,
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
    case "EMPTY_CRITERIA":{
      return {
              ...state,
              data:[]
              }
    }
     case "ERROR_CRITERIA":{
       return {
                ...state,
                fetching: false,
                error: action.payload
              }
     }
     case "SELECT_CRITERIA":{
       return {
                ...state,
                selected: parseInt(action.payload)
              }
     }
     case "UNSELECT_CRITERIA":{
       return {
                ...state,
                selected: null,
                data: [],
              }
     }
     default: {
       return state
     }
  }
}