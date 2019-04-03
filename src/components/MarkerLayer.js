import React, { Component } from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
 ...state
})

class MarkerLayer extends Component {
  render() {
    return (
      <LayerGroup>
        {this.props.map.markers.map((feat, i) => {                     
           return ( 
            <Marker 
              position={feat.geometry.coordinates}
              key={i}
            >
              <Popup>
                <strong>
                  {feat.properties.name}, {feat.properties.location}
                </strong><br/>
                <i>{feat.properties.createdAt.substring(0,10)}</i>
                <p>
                  {feat.properties.text}
                </p>
              </Popup>
            </Marker>
          ) 
        })}
      </LayerGroup>
    );
  }
}

export default connect(mapStateToProps)(MarkerLayer);
