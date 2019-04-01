import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { closeModal } from '../actions';

import { default as MODAL_TYPES } from './modals';

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  closeModal: (val) => dispatch(closeModal(val)),
})

class _Modal extends Component {

  handleOk = (e) => {
    this.props.closeModal()
  }

  handleCancel = (e) => {
    this.props.closeModal()
  }

  render() {
    let SelectedModal = this.props.modal.type ?
                        MODAL_TYPES[this.props.modal.type] :
                        () => (<div></div>)

    return (
      <div className="modal">
        <Modal
          title="Basic Modal"
          visible={this.props.modal.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <SelectedModal />
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Modal);