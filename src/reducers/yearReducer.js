export default function reducer(state={
  data: [
    {id: 2009, question: 2009},
    {id: 2010, question: 2010},
    {id: 2011, question: 2011},
    {id: 2012, question: 2012},
    {id: 2013, question: 2013},
    {id: 2014, question: 2014},
    {id: 2015, question: 2015},
    {id: 2016, question: 2016},
    {id: 2017, question: 2017},
    {id: 2018, question: 2018},
  ],
  selected: null,
}, action){
  switch (action.type) {
    case "REQUEST_DATA":{
      return {...state}
    }
    case "SELECT_YEAR":{
       return {
                ...state,
                selected: parseInt(action.payload)
              }
     }
     case "UNSELECT_YEAR":{
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