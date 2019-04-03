import React, { Component } from 'react'
import { Modal } from 'antd';
import { connect } from 'react-redux';
import {
  closeModal
} from '../../actions'
import Select from '../Select'

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  closeModal: (val) => dispatch(closeModal(val)),
})

class SeeInformationModal extends Component {

  handleOk = (e) => {
    this.props.closeModal()
  }

  handleCancel = (e) => {
    this.props.closeModal()
  }

  render() {
    return (
      <Modal
          title="Add Your Experience"
          visible={this.props.modal.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <p>
              &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors
            </p>
            <p>
              Created by David Fisher
              davidfisher24@gmail.com
            </p>
          </div>
        </Modal>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeInformationModal);