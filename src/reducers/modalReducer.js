export default function reducer(state={
  visible: false,
  type:  null
}, action){
  switch (action.type) {
    case "OPEN_MODAL":{
      return {
        ...state,
        type: action.payload,
        visible: true,
      }
    }
    case "CLOSE_MODAL":{
       return {
                ...state,
                type: null,
                visible: false,
              }
     }
     default: {
       return state
     }
  }
}