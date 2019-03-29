export default function reducer(state={
  data: [],
  fetching: false,
  fetched: false,
  error: null
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

  }
  return state;
}