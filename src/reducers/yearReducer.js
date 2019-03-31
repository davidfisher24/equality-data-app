export default function reducer(state={
  data: [
    {id: 2009, year: 2009},
    {id: 2010, year: 2010},
    {id: 2011, year: 2011},
    {id: 2012, year: 2012},
    {id: 2013, year: 2013},
    {id: 2014, year: 2014},
    {id: 2015, year: 2015},
    {id: 2016, year: 2016},
    {id: 2017, year: 2017},
    {id: 2018, year: 2018},
  ],
  selected: 2018,
}, action){
  switch (action.type) {
    case "REQUEST_YEARS":{
      return {...state}
    }
    case "SELECT_YEAR":{
       return {
                ...state,
                selected: parseInt(action.payload)
              }
     }
     default: {
       return state
     }
  }
}