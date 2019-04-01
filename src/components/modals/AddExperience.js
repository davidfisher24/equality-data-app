import React from 'react'
import { Input } from 'antd';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
 ...state
})

const AddExperienceModal = () => {
  return (
    <div>
      <Input addonBefore="Name" id="name" />
      <Input addonBefore="Location" id="location" />
      <Input.TextArea 
        defaultValue="Tell us your experience" 
        id="text"
      />
    </div>
  )
}

export default connect(mapStateToProps)(AddExperienceModal);