import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer } from 'react-leaflet'
import { connect } from 'react-redux';
import { requestMap } from './actions';
import DataLayer from './components/DataLayer'


const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestMap: () => dispatch(requestMap()),
})

const position = [51.505, -0.09]

class App extends Component {

  componentDidMount () {
    this.props.requestMap();
  }
  
  render() {

    if (!this.props.map.geojson){
        return <div>Loading...</div>
    }


    return (
      <Map center={position} zoom={2}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DataLayer/>
      </Map>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
