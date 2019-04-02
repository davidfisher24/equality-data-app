import React, { Component } from 'react';
import { Select } from 'antd';

class _Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: props.selectedOption ? props.selectedOption : null,
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onChange(selectedOption)
  }

  handleEmpty = () => {
    this.setState({ selectedOption: null });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <Select 
        value={selectedOption ? selectedOption : undefined}
        onChange={this.handleChange.bind(this)}
        style={{width: 230, display: 'block'}}
        placeholder={this.props.placeholder}
      >
        {this.props.options.map(opt => {
          return (
            <Select.Option 
              value={opt.id} 
              key={opt.id}
            >
                {opt.question}
            </Select.Option>)
        })}
      </Select>
    )
  }
}

export default _Select;

