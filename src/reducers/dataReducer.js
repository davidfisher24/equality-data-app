export default function reducer(state={
  data: [],
  fetching: false,
  fetched: false,
  error: null,
  drawer: false,
}, action){
  switch (action.type) {
    case "REQUEST_DATA":{
      return {...state, fetching: true}
    }
    case "RECIEVE_DATA":{
      return {
              ...state,
              fetching: false,
              fetched: true,
              data:action.payload
              }
    }
     case "ERROR_DATA":{
       return {
                ...state,
                fetching: false,
                error: action.payload
              }
     }
     case "OPEN_DATA_DRAWER":{
      return {...state, drawer: true}
    }
    case "CLOSE_DATA_DRAWER":{
      return {...state, drawer: false}
    }
     default: {
       return state
     }
  }
}