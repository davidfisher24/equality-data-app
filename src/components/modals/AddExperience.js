import React, { Component } from 'react'
import { Input } from 'antd';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({

})


class AddExperienceModal extends Component {

  render() {
    return (
      <div>
        <Input addonBefore="Name" id="name" />
        <Input addonBefore="Location" id="location" />
        <Input.TextArea 
          defaultValue="Tell us your experience" 
          id="text"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddExperienceModal);