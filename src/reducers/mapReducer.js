import LConvertor from '../LConvertor'

const getColor = (d) => {
    if (!d) return '#C0C0C0'
    d = d.categories[0].value
    return d >= 100 ? '#800026' :
           d > 85  ? '#BD0026' :
           d > 70  ? '#E31A1C' :
           d > 55  ? '#FC4E2A' :
           d > 40   ? '#FD8D3C' :
           d > 25   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                    '#FFEDA0';
} 

export default function reducer(state={
  coropleth: [],
  markers: [],
  fetching: false,
  fetched: false,
  error: null
}, action){
  switch (action.type) {
    case "REQUEST_MAP":{
      return {...state, fetching: true}
    }
    case "RECIEVE_MAP":{
      return {
              ...state,
              fetching: false,
              fetched: true,
              coropleth: action.payload.features.map((feat, i) => {
                feat.properties.fillColor = 'white';
                feat.properties.fillOpacity = 0;
                feat.geometry.coordinates = LConvertor(feat.geometry.coordinates)
                feat.properties.key = feat.properties.ISO_A3 
                return feat; 
              })
            }
    }
     case "ERROR_MAP":{
       return {
                ...state,
                fetching: false,
                error: action.payload
              }
     }
     case "UPDATE_COROPLETH":{
       return {
                ...state,
                coropleth: state.coropleth.map((feat, i) => {
                  let data = action.payload.find(x => x.Country.wbcodev2 === feat.properties.key);
                  feat.properties.fillColor = getColor(data);
                  feat.properties.fillOpacity = 0.5;
                  return feat; 
                })
              }
     }
     case "UPDATE_MARKERS":{
       return {
                ...state,
                markers: action.payload.features.map((feat, i) => {
                  feat.geometry.coordinates = LConvertor(feat.geometry.coordinates)
                  return feat; 
                })
              }
     }
     default: {
       return state
     }
  }
}