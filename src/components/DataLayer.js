import React, { Component } from 'react';
import { LayerGroup, Polygon } from 'react-leaflet'
import { connect } from 'react-redux';
import LConvertor from '../LConvertor'
import { requestData } from '../actions';

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestData: (obj) => dispatch(requestData(obj)),
})


class DataLayer extends Component {

  getColor(countryIso) {
    if (this.props.data.data.length === 0) return '#ffffff';
    let d = this.props.data.data.find(x => x.Country.wbcodev2 === countryIso);
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

  getOpacity() {
    return this.props.data.data.length > 0 ? 0.5 : 0
  }

  componentWillReceiveProps(nextProps){
    if (
      (
        this.props.category.selected !== nextProps.category.selected ||
        this.props.year.selected !== nextProps.year.selected 
      ) &&
      nextProps.category.selected !== null &&
      nextProps.year.selected !== null
    ) {
      this.props.requestData({
        category: nextProps.category.selected,
        year: nextProps.year.selected
      })
    }
  }

  render() {
    return (
      <LayerGroup>
        {this.props.map.geojson.features.map((country, i) => {                     
           return (<Polygon 
            color="white"
            fillColor={this.getColor(country.properties.ISO_A3)}
            weight={1}
            opacity={1}
            dashArray={3}
            fillOpacity={this.getOpacity()}
            positions={LConvertor(country.geometry.coordinates)} 
            key={country.properties.ISO_A3} 
          />) 
        })}
      </LayerGroup>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DataLayer);
