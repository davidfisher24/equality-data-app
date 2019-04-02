import React, { Component } from 'react';
import { LayerGroup, Polygon } from 'react-leaflet'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
 ...state
})


class DataLayer extends Component {
  render() {
    return (
      <LayerGroup>
        {this.props.map.coropleth.map((feat, i) => {                     
           return (<Polygon 
            className="leaflet-polygon"
            color="white"
            fillColor={feat.properties.fillColor}
            weight={0}
            opacity={0}
            dashArray={0}
            fillOpacity={feat.properties.fillOpacity}
            positions={feat.geometry.coordinates} 
            key={feat.properties.key} 
          />) 
        })}
      </LayerGroup>
    );
  }
}

export default connect(mapStateToProps)(DataLayer);
