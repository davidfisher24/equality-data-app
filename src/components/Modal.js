import React, { Component } from 'react';
import { connect } from 'react-redux';
import { default as MODAL_TYPES } from './modals';

const mapStateToProps = state => ({
 ...state
})

class _Modal extends Component {
  render() {
    let SelectedModal = this.props.modal.type ?
                        MODAL_TYPES[this.props.modal.type] :
                        () => (<div></div>)
    return (
      <SelectedModal />
    );
  }
}

export default connect(mapStateToProps)(_Modal);