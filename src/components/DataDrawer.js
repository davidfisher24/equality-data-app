import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Menu, Icon  } from 'antd';
import { closeDataDrawer } from '../actions';

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  closeDataDrawer: (val) => dispatch(closeDataDrawer(val)),
})

class DataDrawer extends Component {

  closeDrawer() {
    this.props.closeDataDrawer()
  }

  render() {
    return (
      <div id="dataDrawer">
        <Drawer
          width="100%"
          closable={false}
          visible={this.props.data.drawer}
        >
          <Menu
            mode="inline"
            theme="light"
            inlineCollapsed={true}
            style={{ 
              position: 'absolute',
              background: 'none',
              border: 'none',
              top: 0,
              right: 0,
              width: 50
            }} 
          >
            <Menu.Item onClick={this.closeDrawer.bind(this)} >
              <Icon type='right-circle' />&nbsp;
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DataDrawer);
