const MODAL_OPTIONS = {
  'add-experience' : {
    title: 'Add Your Experience',
  },
  'see-information' : {
    title: 'Page Information',
  }
}

export default function reducer(state={
  visible: false,
  props: {},
  type:  null
}, action){
  switch (action.type) {
    case "OPEN_MODAL":{
      return {
        ...state,
        type: action.payload,
        props: MODAL_OPTIONS[action.payload],
        visible: true,
      }
    }
    case "CLOSE_MODAL":{
       return {
                ...state,
                type: null,
                props: {},
                visible: false,
              }
     }
     default: {
       return state
     }
  }
}