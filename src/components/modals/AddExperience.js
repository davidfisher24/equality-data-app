import React, { Component } from 'react'
import { Input, Form, Modal, Tabs, Icon } from 'antd';
import { connect } from 'react-redux';
import {
  buildExperience,
  closeModal,
  startAddingExperience,
  requestExperienceTypes
} from '../../actions'
import Select from '../Select'


const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  buildExperience: (obj) => dispatch(buildExperience(obj)),
  closeModal: (val) => dispatch(closeModal(val)),
  startAddingExperience: () => dispatch(startAddingExperience()),
  requestExperienceTypes: () => dispatch(requestExperienceTypes())
})

class AddExperienceModal extends Component {

  constructor(props){
    super(props)
    this.state = this.props.experience.building
  }

  componentWillMount(){
    this.props.requestExperienceTypes()
  }

  handleOk = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.startAddingExperience()
      }
    });
  }

  handleCancel = (e) => {
    this.props.closeModal()
  }

  handleDataChange (e,val) {
    this.setState({ [e.target.name]: e.target.value },() => this.props.buildExperience(this.state));
  }

  handleSelectChange (val) {
    this.setState({ category: val },() => this.props.buildExperience(this.state));
  }

  handleTypeChange (val) {
    this.setState({ type: val },() => this.props.buildExperience(this.state));
  }

  checkCategory = (rule, value, callback) => {
    if (value && value > -1) {
      callback();
      return;
    }
    callback('Choose a category');
  }

  checkName = (rule, value, callback) => {
    if (value.length > 1) {
      callback();
      return;
    }
    callback('Insert a name');
  }

  checkEmail = (rule, value, callback) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value.length > 4 && re.test(String(value).toLowerCase())) {
      callback();
      return;
    }
    callback('Insert an email');
  }

  checkLocation = (rule, value, callback) => {
    if (value.length > 1) {
      callback();
      return;
    }
    callback('Insert a location');
  }

  checkText = (rule, value, callback) => {
    if (value.length > 20) {
      callback();
      return;
    }
    callback('Must be a minimum 20 characters');
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form 
        onChange={this.handleDataChange.bind(this)}
      >
        <Modal
          title="Add Your Experience"
          visible={this.props.modal.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form.Item>
            <Tabs 
              defaultActiveKey={this.state.type.toString()}
              onChange={this.handleTypeChange.bind(this)}
            >
              {this.props.experience.types.map((type,i) => {
                return (
                  <Tabs.TabPane 
                    tab={<Icon type={type.icon} />} 
                    key={type.id.toString()}
                    style={{height:0}}
                  >
                  </Tabs.TabPane>
                )
              })}
            </Tabs>
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('category', {
              initialValue: this.state.category,
              rules: [{ validator: (this.checkCategory) }],
            })(<Select 
            placeholder="Select Category"
            options={this.props.category.data} 
            onChange={this.handleSelectChange.bind(this)}
            onRef={ref => (this.categorySelect = ref)}
            selectedOption={this.state.category}
          />)}
          </Form.Item>
        
          <Form.Item>
            {getFieldDecorator('name', {
              initialValue: this.state.name,
              rules: [{ validator: (this.checkName) }],
            })(<Input addonBefore="Name" name="name"/>)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('email', {
              initialValue: this.state.email,
              rules: [{ validator: (this.checkEmail) }],
            })(<Input addonBefore="Email" name="email"/>)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('location', {
              initialValue: this.state.location,
              rules: [{ validator: (this.checkLocation) }],
            })(<Input addonBefore="Location" name="location"/>)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('text', {
              initialValue: this.state.text,
              rules: [{ validator: (this.checkText) }],
            })(<Input.TextArea name="text"/>)}
          </Form.Item>
          
          
          
        
      </Modal>
      </Form>
    );
  }
}



const ModalForm = Form.create()(AddExperienceModal)
export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);