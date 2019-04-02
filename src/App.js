import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import { connect } from 'react-redux';
import { requestMap } from './actions';

import DataLayer from './components/DataLayer'
import MarkerLayer from './components/MarkerLayer'
import DataController from './components/DataController'
import YearController from './components/YearController'
import Menu from './components/Menu'
import Modal from './components/Modal'


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

    if (!this.props.map.fetched){
        return <div>Loading...</div>
    }


    return (
    <div id="appContainer">
      <Map center={position} zoom={2} zoomControl={false}
      cursor={null}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DataLayer/>
        <MarkerLayer/>
        <ZoomControl position="bottomright" />
      </Map>
      <YearController />
      <DataController />
      <Menu />
      <Modal />
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
