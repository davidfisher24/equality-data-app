import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import { connect } from 'react-redux';
import { requestMap, submitExperience } from './actions';
import DataLayer from './components/DataLayer'
import MarkerLayer from './components/MarkerLayer'
import DataController from './components/DataController'
import YearController from './components/YearController'
import Menu from './components/Menu'
import Modal from './components/Modal'
import DataDrawer from './components/DataDrawer'

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestMap: () => dispatch(requestMap()),
  submitExperience: (latlng) => dispatch(submitExperience(latlng))
})

const position = [51.505, -0.09]

class App extends Component {

  componentDidMount () {
    this.props.requestMap();
  }

  checkAddMarkerEvent(e) {
    if (!this.props.experience.addingToMap) return;
    this.props.submitExperience(e.latlng);
  }
  
  render() {

    if (!this.props.map.fetched){
        return <div>Loading...</div>
    }


    return (
    <div id="appContainer">
      <Map center={position} zoom={2} zoomControl={false}
      cursor={null}
      className={this.props.experience.addingToMap ? 'addingCursorClass' : ''}
      onClick={this.checkAddMarkerEvent.bind(this)}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DataLayer />
        <MarkerLayer/>
        <ZoomControl position="bottomright" />
      </Map>
      <YearController />
      <DataController />
      <Menu />
      <Modal />
      <DataDrawer />
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
