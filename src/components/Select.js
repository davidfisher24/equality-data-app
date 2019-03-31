import React, { Component } from 'react';
import Select from 'react-select';

const styles = {
  control: (styles, { options }) => { 
    return {
      ...styles, 
      backgroundColor: 'white',
      width: '300px'
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: '#FFF',
      color: '#000',
      fontSize: '12px'
    };
  },
};

class _Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: -1,
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
    this.props.onChange(selectedOption.value)
  }

  handleEmpty = () => {
    this.setState({ selectedOption: -1 });
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <Select
        value={selectedOption}
        placeholder={this.props.placeholder}
        styles={styles}
        onChange={this.handleChange.bind(this)}
        autosize={true}
        options={this.props.options.map(opt => {
          return {
            value: opt.id,
            label: opt.question,
            key: opt.id
          }
        })}
      >
      </Select>
    )
  }
}

export default _Select;

