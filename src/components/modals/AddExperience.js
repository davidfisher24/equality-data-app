import React, { Component } from 'react'
import { Input, Form } from 'antd';
import { connect } from 'react-redux';
import {
  buildExperience
} from '../../actions'
import Select from '../Select'

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  buildExperience: (obj) => dispatch(buildExperience(obj)),
})

class AddExperienceModal extends Component {

  constructor(props){
    super(props)
    this.state = this.props.experience.building
  }

  handleDataChange (e,val) {
    this.setState({ [e.target.name]: e.target.value },() => this.props.buildExperience(this.state));
  }

  handleSelectChange (val) {
    this.setState({ CategoryId: val },() => this.props.buildExperience(this.state));
  }

  render() {
    return (
      <Form 
        onChange={this.handleDataChange.bind(this)}
      >
        <Select 
          placeholder="Select Category"
          options={this.props.category.data} 
          onChange={this.handleSelectChange.bind(this)}
          onRef={ref => (this.categorySelect = ref)}
          selectedOption={this.state.CategoryId}
        />
        <Input addonBefore="Name" name="name" value={this.state.name}/>
        <Input addonBefore="Email" name="email" value={this.state.email}/>
        <Input addonBefore="Location" name="location" value={this.state.location}/>
        <Input.TextArea 
          name="text"
          value={this.state.text}
        />
      </Form>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddExperienceModal);