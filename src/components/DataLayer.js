import React, { Component } from 'react';
import { LayerGroup, Polygon } from 'react-leaflet'
import { connect } from 'react-redux';
import LConvertor from '../LConvertor'
import { requestData } from '../actions';

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(requestData()),
})


class DataLayer extends Component {

  getColor(d) {
    if (!d) return '#C0C0C0'
    return d >= 100 ? '#800026' :
           d > 85  ? '#BD0026' :
           d > 70  ? '#E31A1C' :
           d > 55  ? '#FC4E2A' :
           d > 40   ? '#FD8D3C' :
           d > 25   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                    '#FFEDA0';
  } 
  
  render() {
    return (
      <LayerGroup>
        {this.props.map.geojson.features.map((country, i) => {                     
           return (<Polygon 
            color="white"
            fillColor="white"
            weight={2}
            opacity={0}
            dashArray={3}
            fillOpacity={0}
            positions={LConvertor(country.geometry.coordinates)} 
            key={country.properties.ISO_A3} 
          />) 
        })}
      </LayerGroup>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataLayer);
