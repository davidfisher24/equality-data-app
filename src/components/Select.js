import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = { value: -1 };
  }
  onChange(e) {
    this.setState({
      value: e.target.value
    })
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <div className="form-group">
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
        <option value={-1} key={-1}>Select....</option>
        {this.props.options.map(opt => {
          return <option value={opt.id} key={opt.id} >{opt.question}</option>
        })}
      </select>
      </div>
      
    )
  }
}

export default Select;

