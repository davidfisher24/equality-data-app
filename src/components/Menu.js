import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from "antd";
import { 
  requestExperiences, 
  removeExperiences, 
  openModal,
  openDataDrawer
} from '../actions';

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestExperiences: (val) => dispatch(requestExperiences()),
  removeExperiences: (val) => dispatch(removeExperiences()),
  openModal: (val) => dispatch(openModal(val)),
  openDataDrawer: (val) => dispatch(openDataDrawer(val)),
})


class _Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
     collapsed: false,
     markers: false,
    }
  }
  componentDidMount(){
    this.setState({
      collapsed: true,
    });
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  toggleExperiences = () => {
    if (this.state.markers) this.props.removeExperiences();
    else this.props.requestExperiences();
    this.setState({
      markers: !this.state.markers,
    });
  }

  openDataDrawer = () => {
    this.props.openDataDrawer()
  }


  openModal = (val) => {
    let type;
    switch (parseInt(val.key)) {
      case 2:
        type = 'add-experience';
        break;
      case 4:
      default:
        type = 'see-information';
        break;
    }
    this.props.openModal(type)
  }

  render() {
    const {collapsed} = this.state
    return (
      <div style={{ width: 256 }} id="menu">

        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          style={{ 
            float: 'right', 
            background: this.state.collapsed ? 'none' : '#FFF'
          }} 
        >
          <Menu.Item key="0" onClick={this.toggleCollapsed} >
            <Icon type={this.state.collapsed ? 'left-circle' : 'right-circle'} />
            <span>&nbsp;&nbsp;</span>
          </Menu.Item>

          <Menu.Item key="1" onClick={this.toggleExperiences.bind(this)}>
            <Icon type="global" />
            <span>Show Markers</span>
          </Menu.Item>

          <Menu.Item key="2" onClick={this.openModal.bind(this)}>
            <Icon type="plus-circle" />
            <span>Add Your Marker</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="pie-chart" onClick={this.openDataDrawer.bind(this)}/>
            <span>Show Table Data</span>
          </Menu.Item>
          <Menu.Item key="4" onClick={this.openModal.bind(this)}>
            <Icon type="info-circle"/>
            <span>Information</span>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Menu);

