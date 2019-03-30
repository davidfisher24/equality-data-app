import React, { Component } from 'react';
import { LayerGroup, Polygon } from 'react-leaflet'
import { connect } from 'react-redux';
import { requestData } from '../actions';

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestData: (obj) => dispatch(requestData(obj)),
})


class DataLayer extends Component {
  render() {
    return (
      <LayerGroup>
        {this.props.map.coropleth.map((feat, i) => {                     
           return (<Polygon 
            color="white"
            fillColor={feat.properties.fillColor}
            weight={1}
            opacity={1}
            dashArray={3}
            fillOpacity={feat.properties.fillOpacity}
            positions={feat.geometry.coordinates} 
            key={feat.properties.key} 
          />) 
        })}
      </LayerGroup>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DataLayer);
