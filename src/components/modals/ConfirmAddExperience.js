import React, { Component } from 'react'
import { Modal } from 'antd';
import { connect } from 'react-redux';
import {
  submitExperience,
  resetExperienceLocation
} from '../../actions'

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  submitExperience: () => dispatch(submitExperience()),
  resetExperienceLocation: () => dispatch(resetExperienceLocation())
})

class SeeInformationModal extends Component {

  handleOk = (e) => {
    this.props.submitExperience()
  }

  handleCancel = (e) => {
    this.props.resetExperienceLocation()
  }

  render() {
    const experience = this.props.experience.building
    const countryName = experience.countryName ? `, ${experience.countryName}` : '';
    return (
      <Modal
          title="Confirm Your Experience and Location?"
          visible={this.props.modal.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <p><strong>Name:</strong> {experience.name}</p>
            <p><strong>Location:</strong> {experience.location}{countryName}</p>
            <p><i>{experience.text}</i></p>
          </div>
        </Modal>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeInformationModal);